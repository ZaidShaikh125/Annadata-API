import { Body, Controller, Headers, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Request } from 'express';
import { AdminAuthService } from './admin-auth.service';
import type { AdminRequestUser } from './admin-auth.types'; import { AdminSessionGuard } from './admin-session.guard';
import { ExchangeAdminSessionDto } from './admin-auth.dto';
@ApiTags('admin-auth') @Controller('admin/auth') export class AdminAuthController { constructor(private readonly auth: AdminAuthService) {} @Post('sessions') @Throttle({default:{limit:10,ttl:60000}}) @ApiBearerAuth() exchange(@Headers('authorization') authorization: string | undefined, @Headers('user-agent') userAgent: string | undefined, @Headers('x-forwarded-for') forwardedFor: string | undefined, @Body() body: ExchangeAdminSessionDto) { if (body.provider !== 'entra' || !authorization?.startsWith('Bearer ')) throw new UnauthorizedException('Entra bearer token required.'); return this.auth.exchangeEntraToken(authorization.slice(7), { userAgent, ip: forwardedFor?.split(',')[0]?.trim() }); } @Post('sessions/current/revoke') @UseGuards(AdminSessionGuard) revoke(@Req()req:Request&{admin?:AdminRequestUser}) { return this.auth.revoke(req.admin!.sessionId,req.admin!.admin.id); } }
