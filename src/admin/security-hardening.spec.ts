import { ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdminSessionGuard } from './auth/admin-session.guard';
import { PermissionsGuard } from './auth/permissions.guard';
import { InternalAdminService } from './internal/internal-admin.service';
import { permissionsForRoles } from './auth/role-catalog';

const context = (request: Record<string, unknown>) => ({ switchToHttp: () => ({ getRequest: () => request }), getHandler: () => function handler(){}, getClass: () => class Controller{} }) as unknown as ExecutionContext;

describe('admin security hardening', () => {
  it('does not accept an admin session from a browser cookie', async () => {
    const auth = { validateSession: jest.fn() };
    const guard = new AdminSessionGuard(auth as never);
    await expect(guard.canActivate(context({ headers: { cookie: 'annadata_admin_session=stolen' } }))).rejects.toBeInstanceOf(UnauthorizedException);
    expect(auth.validateSession).not.toHaveBeenCalled();
  });

  it('accepts wildcard permission only for controlled super admins', () => {
    const reflector = { getAllAndOverride: () => 'roles.manage' } as unknown as Reflector;
    const guard = new PermissionsGuard(reflector);
    expect(guard.canActivate(context({ admin: { admin: { permissions: ['*'] } } }))).toBe(true);
  });

  it('prevents an administrator from changing their own roles', async () => {
    const service = new InternalAdminService({} as never, {} as never, {} as never, {} as never);
    const actor = { sessionId: 'session', admin: { id: 'same-admin' } } as never;
    await expect(service.updateRoles('same-admin', ['Super Admin'], actor)).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('prevents a non-super administrator from granting Super Admin', async () => {
    const service = new InternalAdminService({} as never, {} as never, {} as never, {} as never);
    const actor = { sessionId: 'session', admin: { id: 'platform-admin', superAdmin: false } } as never;
    await expect(service.updateRoles('another-admin', ['Super Admin'], actor)).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('does not grant role-management permissions to support agents', () => {
    expect(permissionsForRoles(['Support Agent'])).not.toContain('roles.manage');
  });
});
