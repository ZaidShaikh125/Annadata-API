import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import type { AdminRequestUser } from '../auth/admin-auth.types';
import { AdminSessionGuard } from '../auth/admin-session.guard';
import { RequirePermission } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { ResolveSafetyIncidentDto, RestrictListingDto, SafetyFindingDto, UpdateSafetyIncidentDto } from './safety-investigations.dto';
import { SafetyInvestigationsService } from './safety-investigations.service';

@ApiTags('admin-safety') @Controller('admin/safety-incidents') @UseGuards(AdminSessionGuard, PermissionsGuard)
export class SafetyInvestigationsController {
  constructor(private readonly safety: SafetyInvestigationsService) {}
  @Get() @RequirePermission('safety.read') list(@Query('status') status?: string, @Query('severity') severity?: string) { return this.safety.list(status, severity); }
  @Get(':id') @RequirePermission('safety.read') get(@Param('id') id: string) { return this.safety.get(id); }
  @Patch(':id') @RequirePermission('safety.investigate') update(@Param('id') id: string, @Body() body: UpdateSafetyIncidentDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.safety.update(id, body, req.admin!); }
  @Post(':id/findings') @RequirePermission('safety.investigate') finding(@Param('id') id: string, @Body() body: SafetyFindingDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.safety.addFinding(id, body.finding, req.admin!); }
  @Post(':id/resolve') @RequirePermission('safety.resolve') resolve(@Param('id') id: string, @Body() body: ResolveSafetyIncidentDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.safety.resolve(id, body.resolution, req.admin!); }
  @Post(':id/restrict-listing') @RequirePermission('safety.restrict') restrict(@Param('id') id: string, @Body() body: RestrictListingDto, @Req() req: Request & { admin?: AdminRequestUser }) { return this.safety.restrictAffectedListing(id, body.reason, req.admin!); }
}
