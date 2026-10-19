import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { jwtVerify, createRemoteJWKSet, type JWTPayload } from 'jose';
import { randomUUID } from 'node:crypto';
import { IsNull, Repository } from 'typeorm';
import { AdminSession } from '../../database/entities/admin-session.entity';
import { AdminUser } from '../../database/entities/admin-user.entity';
import { AuditEvent } from '../../database/entities/audit-event.entity';

@Injectable()
export class AdminAuthService {
  constructor(@InjectRepository(AdminSession) private readonly sessions: Repository<AdminSession>, @InjectRepository(AdminUser) private readonly admins: Repository<AdminUser>, @InjectRepository(AuditEvent) private readonly audit: Repository<AuditEvent>) {}
  async exchangeEntraToken(accessToken: string, context: { ip?: string; userAgent?: string }) {
    const tenant = process.env.ENTRA_TENANT_ID; const audience = process.env.ENTRA_AUDIENCE;
    if (!tenant || !audience) throw new UnauthorizedException('Admin identity validation is not configured.');
    const issuer = `https://login.microsoftonline.com/${tenant}/v2.0`;
    const jwks = createRemoteJWKSet(new URL(`https://login.microsoftonline.com/${tenant}/discovery/v2.0/keys`));
    let payload: JWTPayload;
    try { ({ payload } = await jwtVerify(accessToken, jwks, { issuer, audience })); } catch { throw new UnauthorizedException('Invalid Microsoft Entra access token.'); }
    const objectId = typeof payload.oid === 'string' ? payload.oid : undefined; if (!objectId) throw new UnauthorizedException('Missing immutable identity identifier.');
    const admin = await this.admins.findOne({ where: { entraObjectId: objectId, active: true } }); if (!admin) throw new UnauthorizedException('Identity is not an approved administrator.');
    const session = this.sessions.create({ id: randomUUID(), adminUserId: admin.id, expiresAt: new Date(Date.now() + Number(process.env.ADMIN_SESSION_TTL_SECONDS ?? 28800) * 1000), revokedAt: null, ipAddress: context.ip ?? null, userAgent: context.userAgent ?? null }); await this.sessions.save(session);
    await this.audit.save(this.audit.create({ actorAdminUserId: admin.id, action: 'admin.session.created', entityType: 'admin_session', entityId: session.id, outcome: 'success', correlationId: null, metadata: { provider: 'entra' } }));
    return { sessionId: session.id, expiresAt: session.expiresAt.toISOString() };
  }
  async revoke(sessionId: string) { await this.sessions.update({ id: sessionId }, { revokedAt: new Date() }); return { revoked: true }; }
  async validateSession(sessionId: string) { const session = await this.sessions.findOne({ where: { id: sessionId, revokedAt: IsNull() } }); if (!session || session.expiresAt.getTime() <= Date.now()) return null; return this.admins.findOne({ where: { id: session.adminUserId, active: true } }); }
}
