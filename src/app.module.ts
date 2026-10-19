import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AdminSession } from './database/entities/admin-session.entity';
import { AdminUser } from './database/entities/admin-user.entity';
import { AuditEvent } from './database/entities/audit-event.entity';
import { Community } from './database/entities/community.entity';
import { FoodListing } from './database/entities/food-listing.entity';
import { Pickup } from './database/entities/pickup.entity';
import { SafetyIncident } from './database/entities/safety-incident.entity';
import { UserAccount } from './database/entities/user-account.entity';
import { FoodRequest } from './database/entities/food-request.entity';

@Module({ imports: [ConfigModule.forRoot({ isGlobal: true }), TypeOrmModule.forRootAsync({ imports: [ConfigModule], inject: [ConfigService], useFactory: (config: ConfigService) => ({ type: 'postgres', url: config.getOrThrow<string>('DATABASE_URL'), entities: [AdminSession, AdminUser, AuditEvent, Community, FoodListing, FoodRequest, Pickup, SafetyIncident, UserAccount], synchronize: false }) }), AdminModule] })
export class AppModule {}
