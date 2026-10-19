import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import type { AdminRequestUser } from '../auth/admin-auth.types';
import { AdminSessionGuard } from '../auth/admin-session.guard';
import { RequirePermission } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { CreateAnnouncementDto, CreateNotificationTemplateDto, ScheduleAnnouncementDto, UpdateNotificationTemplateDto } from './notification-operations.dto';
import { NotificationOperationsService } from './notification-operations.service';

@ApiTags('admin-notifications') @Controller('admin/notifications') @UseGuards(AdminSessionGuard, PermissionsGuard)
export class NotificationOperationsController {
  constructor(private readonly notifications: NotificationOperationsService) {}
  @Get('templates') @RequirePermission('notifications.read') templates(@Query('enabled') enabled?: string) { return this.notifications.listTemplates(enabled); }
  @Post('templates') @RequirePermission('notifications.manage') createTemplate(@Body() body: CreateNotificationTemplateDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.notifications.createTemplate(body, req.admin!); }
  @Patch('templates/:id') @RequirePermission('notifications.manage') updateTemplate(@Param('id') id: string, @Body() body: UpdateNotificationTemplateDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.notifications.updateTemplate(id, body, req.admin!); }
  @Get('announcements') @RequirePermission('notifications.read') announcements(@Query('status') status?: string) { return this.notifications.listAnnouncements(status); }
  @Post('announcements') @RequirePermission('notifications.manage') createAnnouncement(@Body() body: CreateAnnouncementDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.notifications.createAnnouncement(body, req.admin!); }
  @Post('announcements/:id/publish') @RequirePermission('notifications.publish') publish(@Param('id') id: string, @Req() req: Request & { admin?: AdminRequestUser }) { return this.notifications.publish(id, req.admin!); }
  @Post('announcements/:id/schedule') @RequirePermission('notifications.publish') schedule(@Param('id') id: string, @Body() body: ScheduleAnnouncementDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.notifications.schedule(id, body.scheduledAt, req.admin!); }
  @Post('announcements/:id/cancel') @RequirePermission('notifications.publish') cancel(@Param('id') id: string, @Req() req: Request & { admin?: AdminRequestUser }) { return this.notifications.cancel(id, req.admin!); }
  @Get('deliveries') @RequirePermission('notifications.read') deliveries(@Query('status') status?: string) { return this.notifications.listDeliveries(status); }
}
