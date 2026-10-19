import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminSession } from '../database/entities/admin-session.entity';
import { AdminUser } from '../database/entities/admin-user.entity';
import { AuditEvent } from '../database/entities/audit-event.entity';
import { Community } from '../database/entities/community.entity';
import { FoodListing } from '../database/entities/food-listing.entity';
import { Pickup } from '../database/entities/pickup.entity';
import { SafetyIncident } from '../database/entities/safety-incident.entity';
import { UserAccount } from '../database/entities/user-account.entity';
import { FoodRequest } from '../database/entities/food-request.entity';
import { AdminAuthController } from './auth/admin-auth.controller';
import { AdminAuthService } from './auth/admin-auth.service'; import { AdminSessionGuard } from './auth/admin-session.guard'; import { PermissionsGuard } from './auth/permissions.guard';
import { AdminDashboardController } from './dashboard/admin-dashboard.controller';
import { AdminDashboardService } from './dashboard/admin-dashboard.service';
import { AdminOperationsController } from './operations/admin-operations.controller'; import { AdminOperationsService } from './operations/admin-operations.service';
import { PickupOperationsController } from './pickups/pickup-operations.controller'; import { PickupOperationsService } from './pickups/pickup-operations.service';

@Module({ imports: [TypeOrmModule.forFeature([AdminSession, AdminUser, AuditEvent, Community, FoodListing, FoodRequest, Pickup, SafetyIncident, UserAccount])], controllers: [AdminAuthController, AdminDashboardController, AdminOperationsController, PickupOperationsController], providers: [AdminAuthService, AdminDashboardService, AdminOperationsService, PickupOperationsService, AdminSessionGuard, PermissionsGuard] })
export class AdminModule {}
