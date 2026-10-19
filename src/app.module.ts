import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AdminSession } from './database/entities/admin-session.entity';
import { AdminUser } from './database/entities/admin-user.entity';
import { Announcement } from './database/entities/announcement.entity';
import { AuditEvent } from './database/entities/audit-event.entity';
import { Community } from './database/entities/community.entity';
import { FoodListing } from './database/entities/food-listing.entity';
import { FoodRequest } from './database/entities/food-request.entity';
import { NotificationDelivery } from './database/entities/notification-delivery.entity';
import { NotificationTemplate } from './database/entities/notification-template.entity';
import { OutboxEvent } from './database/entities/outbox-event.entity';
import { Pickup } from './database/entities/pickup.entity';
import { SafetyIncident } from './database/entities/safety-incident.entity';
import { UserAccount } from './database/entities/user-account.entity';
import { VolunteerTask } from './database/entities/volunteer-task.entity';
import { Volunteer } from './database/entities/volunteer.entity';
import { SnakeCaseNamingStrategy } from './database/snake-case-naming.strategy';

const entities = [AdminSession, AdminUser, Announcement, AuditEvent, Community, FoodListing, FoodRequest, NotificationDelivery, NotificationTemplate, OutboxEvent, Pickup, SafetyIncident, UserAccount, Volunteer, VolunteerTask];

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: (config: ConfigService) => ({ type: 'postgres', url: config.getOrThrow<string>('DATABASE_URL'), entities, namingStrategy: new SnakeCaseNamingStrategy(), synchronize: false }) }), AdminModule] })
export class AppModule {}
