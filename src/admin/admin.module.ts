import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSession } from '../database/entities/admin-session.entity';
import { AdminUser } from '../database/entities/admin-user.entity';
import { Announcement } from '../database/entities/announcement.entity';
import { AuditEvent } from '../database/entities/audit-event.entity';
import { BackgroundJob } from '../database/entities/background-job.entity';
import { Community } from '../database/entities/community.entity';
import { ExportArtifact } from '../database/entities/export-artifact.entity';
import { FoodListing } from '../database/entities/food-listing.entity';
import { FoodRequest } from '../database/entities/food-request.entity';
import { NotificationDelivery } from '../database/entities/notification-delivery.entity';
import { NotificationTemplate } from '../database/entities/notification-template.entity';
import { MobileConfigVersion } from '../database/entities/mobile-config-version.entity';
import { OutboxEvent } from '../database/entities/outbox-event.entity';
import { PlatformSetting } from '../database/entities/platform-setting.entity';
import { Pickup } from '../database/entities/pickup.entity';
import { SafetyIncident } from '../database/entities/safety-incident.entity';
import { ReportDefinition } from '../database/entities/report-definition.entity';
import { ReportRun } from '../database/entities/report-run.entity';
import { SupportMessage } from '../database/entities/support-message.entity';
import { SupportTicket } from '../database/entities/support-ticket.entity';
import { UserAccount } from '../database/entities/user-account.entity';
import { VolunteerTask } from '../database/entities/volunteer-task.entity';
import { Volunteer } from '../database/entities/volunteer.entity';
import { AdminAuthController } from './auth/admin-auth.controller';
import { AdminAuthService } from './auth/admin-auth.service';
import { AdminSessionGuard } from './auth/admin-session.guard';
import { PermissionsGuard } from './auth/permissions.guard';
import { AdminDashboardController } from './dashboard/admin-dashboard.controller';
import { AdminDashboardService } from './dashboard/admin-dashboard.service';
import { InternalAdminController } from './internal/internal-admin.controller';
import { InternalAdminService } from './internal/internal-admin.service';
import { JobsController } from './jobs/jobs.controller';
import { JobsService } from './jobs/jobs.service';
import { MobileConfigController, PublicMobileConfigController } from './mobile/mobile-config.controller';
import { MobileConfigService } from './mobile/mobile-config.service';
import { NotificationOperationsController } from './notifications/notification-operations.controller';
import { NotificationOperationsService } from './notifications/notification-operations.service';
import { AdminOperationsController } from './operations/admin-operations.controller';
import { AdminOperationsService } from './operations/admin-operations.service';
import { PickupOperationsController } from './pickups/pickup-operations.controller';
import { PickupOperationsService } from './pickups/pickup-operations.service';
import { ReportsController } from './reports/reports.controller';
import { ReportsService } from './reports/reports.service';
import { SafetyInvestigationsController } from './safety/safety-investigations.controller';
import { SafetyInvestigationsService } from './safety/safety-investigations.service';
import { SupportController } from './support/support.controller';
import { SupportService } from './support/support.service';
import { SystemOperationsController } from './system/system-operations.controller';
import { SystemOperationsService } from './system/system-operations.service';
import { VolunteerOperationsController } from './volunteers/volunteer-operations.controller';
import { VolunteerOperationsService } from './volunteers/volunteer-operations.service';

const entities = [AdminSession, AdminUser, Announcement, AuditEvent, BackgroundJob, Community, ExportArtifact, FoodListing, FoodRequest, MobileConfigVersion, NotificationDelivery, NotificationTemplate, OutboxEvent, Pickup, PlatformSetting, ReportDefinition, ReportRun, SafetyIncident, SupportMessage, SupportTicket, UserAccount, Volunteer, VolunteerTask];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AdminAuthController, AdminDashboardController, AdminOperationsController, PickupOperationsController, SafetyInvestigationsController, VolunteerOperationsController, NotificationOperationsController, SupportController, ReportsController, JobsController, SystemOperationsController, InternalAdminController, MobileConfigController, PublicMobileConfigController],
  providers: [AdminAuthService, AdminDashboardService, AdminOperationsService, PickupOperationsService, SafetyInvestigationsService, VolunteerOperationsService, NotificationOperationsService, SupportService, ReportsService, JobsService, SystemOperationsService, InternalAdminService, MobileConfigService, AdminSessionGuard, PermissionsGuard],
})
export class AdminModule {}
