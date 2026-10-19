import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import type { AdminRequestUser } from '../auth/admin-auth.types';
import { AdminSessionGuard } from '../auth/admin-session.guard';
import { RequirePermission } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AssignVolunteerDto, CreateVolunteerTaskDto, VolunteerDecisionDto } from './volunteer-operations.dto';
import { VolunteerOperationsService } from './volunteer-operations.service';

@ApiTags('admin-volunteers') @Controller('admin/volunteers') @UseGuards(AdminSessionGuard, PermissionsGuard)
export class VolunteerOperationsController {
  constructor(private readonly operations: VolunteerOperationsService) {}
  @Get() @RequirePermission('volunteers.read') list(@Query('status') status?: string) { return this.operations.list(status); }
  @Get('applications') @RequirePermission('volunteers.read') applications(@Query('status') status?: string) { return this.operations.applications(status); }
  @Post(':id/approve') @RequirePermission('volunteers.manage') approve(@Param('id') id: string, @Body() body: VolunteerDecisionDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.operations.decide(id, 'approved', body.reason, req.admin!); }
  @Post(':id/reject') @RequirePermission('volunteers.manage') reject(@Param('id') id: string, @Body() body: VolunteerDecisionDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.operations.decide(id, 'rejected', body.reason, req.admin!); }
  @Get('tasks') @RequirePermission('volunteers.read') tasks(@Query('status') status?: string) { return this.operations.tasksList(status); }
  @Post('tasks') @RequirePermission('volunteers.manage') createTask(@Body() body: CreateVolunteerTaskDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.operations.createTask(body, req.admin!); }
  @Post('tasks/:id/assign') @RequirePermission('volunteers.manage') assign(@Param('id') id: string, @Body() body: AssignVolunteerDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.operations.assign(id, body.volunteerId, req.admin!); }
}
