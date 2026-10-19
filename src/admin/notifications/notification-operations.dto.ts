import { IsBoolean, IsDateString, IsIn, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateNotificationTemplateDto {
  @IsString() @IsNotEmpty() @MaxLength(120) name!: string;
  @IsString() @IsNotEmpty() @MaxLength(120) eventType!: string;
  @IsIn(['in_app', 'push', 'email', 'sms']) channel!: string;
  @IsString() @IsNotEmpty() @MaxLength(20) language!: string;
  @IsString() @IsNotEmpty() @MaxLength(200) subject!: string;
  @IsString() @IsNotEmpty() @MaxLength(10000) body!: string;
  @IsOptional() @IsBoolean() enabled?: boolean;
}
export class UpdateNotificationTemplateDto {
  @IsOptional() @IsString() @IsNotEmpty() @MaxLength(120) name?: string;
  @IsOptional() @IsString() @IsNotEmpty() @MaxLength(200) subject?: string;
  @IsOptional() @IsString() @IsNotEmpty() @MaxLength(10000) body?: string;
  @IsOptional() @IsBoolean() enabled?: boolean;
}
export class CreateAnnouncementDto {
  @IsString() @IsNotEmpty() @MaxLength(200) title!: string;
  @IsString() @IsNotEmpty() @MaxLength(10000) body!: string;
  @IsObject() audience!: Record<string, unknown>;
  @IsIn(['in_app', 'push', 'email', 'sms']) channel!: string;
  @IsString() @IsNotEmpty() @MaxLength(20) language!: string;
}
export class ScheduleAnnouncementDto { @IsDateString() scheduledAt!: string; }
