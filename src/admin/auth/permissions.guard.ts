import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { REQUIRED_PERMISSION } from './permissions.decorator';
import type { AdminRequestUser } from './admin-auth.types';
@Injectable() export class PermissionsGuard implements CanActivate { constructor(private readonly reflector: Reflector) {} canActivate(context: ExecutionContext) { const required = this.reflector.getAllAndOverride<string>(REQUIRED_PERMISSION, [context.getHandler(), context.getClass()]); if (!required) return true; const request = context.switchToHttp().getRequest<Request & { admin?: AdminRequestUser }>(); if (!request.admin?.admin.permissions.includes(required)) throw new ForbiddenException('Admin permission required.'); return true; } }
