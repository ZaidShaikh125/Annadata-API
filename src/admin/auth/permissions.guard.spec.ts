import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from './permissions.guard';

function contextWithPermissions(permissions: string[]): ExecutionContext {
  return { getHandler: () => function handler() {}, getClass: () => class Controller {}, switchToHttp: () => ({ getRequest: () => ({ admin: { admin: { permissions } } }) }) } as unknown as ExecutionContext;
}

describe('PermissionsGuard', () => {
  it('allows an admin with the required permission', () => {
    const reflector = { getAllAndOverride: () => 'users.read' } as unknown as Reflector;
    expect(new PermissionsGuard(reflector).canActivate(contextWithPermissions(['users.read']))).toBe(true);
  });

  it('rejects an admin without the required permission', () => {
    const reflector = { getAllAndOverride: () => 'users.suspend' } as unknown as Reflector;
    expect(() => new PermissionsGuard(reflector).canActivate(contextWithPermissions(['users.read']))).toThrow('Admin permission required.');
  });
});
