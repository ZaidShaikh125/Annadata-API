import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AdminSession } from './database/entities/admin-session.entity';
import { AdminUser } from './database/entities/admin-user.entity';
import { Announcement } from './database/entities/announcement.entity';
import { AuditEvent } from './database/entities/audit-event.entity';
import { BackgroundJob } from './database/entities/background-job.entity';
import { Community } from './database/entities/community.entity';
import { ExportArtifact } from './database/entities/export-artifact.entity';
import { FoodListing } from './database/entities/food-listing.entity';
import { FoodRequest } from './database/entities/food-request.entity';
import { MobileConfigVersion } from './database/entities/mobile-config-version.entity';
import { NotificationDelivery } from './database/entities/notification-delivery.entity';
import { NotificationTemplate } from './database/entities/notification-template.entity';
import { OutboxEvent } from './database/entities/outbox-event.entity';
import { PlatformSetting } from './database/entities/platform-setting.entity';
import { Pickup } from './database/entities/pickup.entity';
import { SafetyIncident } from './database/entities/safety-incident.entity';
import { ReportDefinition } from './database/entities/report-definition.entity';
import { ReportRun } from './database/entities/report-run.entity';
import { SupportMessage } from './database/entities/support-message.entity';
import { SupportTicket } from './database/entities/support-ticket.entity';
import { UserAccount } from './database/entities/user-account.entity';
import { VolunteerTask } from './database/entities/volunteer-task.entity';
import { Volunteer } from './database/entities/volunteer.entity';
import { SnakeCaseNamingStrategy } from './database/snake-case-naming.strategy';

const entities = [AdminSession, AdminUser, Announcement, AuditEvent, BackgroundJob, Community, ExportArtifact, FoodListing, FoodRequest, MobileConfigVersion, NotificationDelivery, NotificationTemplate, OutboxEvent, Pickup, PlatformSetting, ReportDefinition, ReportRun, SafetyIncident, SupportMessage, SupportTicket, UserAccount, Volunteer, VolunteerTask];

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot(), ThrottlerModule.forRoot([{ttl:60000,limit:120}]), TypeOrmModule.forRootAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: (config: ConfigService) => ({ type: 'postgres', url: config.getOrThrow<string>('DATABASE_URL'), entities, namingStrategy: new SnakeCaseNamingStrategy(), synchronize: false }) }), AdminModule],providers:[{provide:APP_GUARD,useClass:ThrottlerGuard}] })
export class AppModule {}
