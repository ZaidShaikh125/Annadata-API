import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { AdminAuthService } from './admin-auth.service';
import type { AdminRequestUser } from './admin-auth.types';

@Injectable()
export class AdminSessionGuard implements CanActivate {
  constructor(private readonly auth: AdminAuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request & { admin?: AdminRequestUser }>();
    const sessionId = request.headers.authorization?.startsWith('Bearer ') ? request.headers.authorization.slice(7) : undefined;
    if (!sessionId) throw new UnauthorizedException('Admin session required.');
    const user = await this.auth.validateSession(sessionId);
    if (!user) throw new UnauthorizedException('Admin session is expired or revoked.');
    request.admin = { sessionId, admin: user };
    return true;
  }
}
