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
import { AdminAuthController } from './auth/admin-auth.controller';
import { AdminAuthService } from './auth/admin-auth.service';
import { AdminDashboardController } from './dashboard/admin-dashboard.controller';
import { AdminDashboardService } from './dashboard/admin-dashboard.service';

@Module({ imports: [TypeOrmModule.forFeature([AdminSession, AdminUser, AuditEvent, Community, FoodListing, Pickup, SafetyIncident, UserAccount])], controllers: [AdminAuthController, AdminDashboardController], providers: [AdminAuthService, AdminDashboardService] })
export class AdminModule {}
