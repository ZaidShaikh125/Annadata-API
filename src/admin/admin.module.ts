import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSession } from '../database/entities/admin-session.entity';
import { AdminUser } from '../database/entities/admin-user.entity';
import { Announcement } from '../database/entities/announcement.entity';
import { AuditEvent } from '../database/entities/audit-event.entity';
import { Community } from '../database/entities/community.entity';
import { FoodListing } from '../database/entities/food-listing.entity';
import { FoodRequest } from '../database/entities/food-request.entity';
import { NotificationDelivery } from '../database/entities/notification-delivery.entity';
import { NotificationTemplate } from '../database/entities/notification-template.entity';
import { OutboxEvent } from '../database/entities/outbox-event.entity';
import { Pickup } from '../database/entities/pickup.entity';
import { SafetyIncident } from '../database/entities/safety-incident.entity';
import { UserAccount } from '../database/entities/user-account.entity';
import { VolunteerTask } from '../database/entities/volunteer-task.entity';
import { Volunteer } from '../database/entities/volunteer.entity';
import { AdminAuthController } from './auth/admin-auth.controller';
import { AdminAuthService } from './auth/admin-auth.service';
import { AdminSessionGuard } from './auth/admin-session.guard';
import { PermissionsGuard } from './auth/permissions.guard';
import { AdminDashboardController } from './dashboard/admin-dashboard.controller';
import { AdminDashboardService } from './dashboard/admin-dashboard.service';
import { NotificationOperationsController } from './notifications/notification-operations.controller';
import { NotificationOperationsService } from './notifications/notification-operations.service';
import { AdminOperationsController } from './operations/admin-operations.controller';
import { AdminOperationsService } from './operations/admin-operations.service';
import { PickupOperationsController } from './pickups/pickup-operations.controller';
import { PickupOperationsService } from './pickups/pickup-operations.service';
import { SafetyInvestigationsController } from './safety/safety-investigations.controller';
import { SafetyInvestigationsService } from './safety/safety-investigations.service';
import { VolunteerOperationsController } from './volunteers/volunteer-operations.controller';
import { VolunteerOperationsService } from './volunteers/volunteer-operations.service';

const entities = [AdminSession, AdminUser, Announcement, AuditEvent, Community, FoodListing, FoodRequest, NotificationDelivery, NotificationTemplate, OutboxEvent, Pickup, SafetyIncident, UserAccount, Volunteer, VolunteerTask];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  controllers: [AdminAuthController, AdminDashboardController, AdminOperationsController, PickupOperationsController, SafetyInvestigationsController, VolunteerOperationsController, NotificationOperationsController],
  providers: [AdminAuthService, AdminDashboardService, AdminOperationsService, PickupOperationsService, SafetyInvestigationsService, VolunteerOperationsService, NotificationOperationsService, AdminSessionGuard, PermissionsGuard],
})
export class AdminModule {}
