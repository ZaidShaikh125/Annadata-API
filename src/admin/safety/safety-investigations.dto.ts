import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdateSafetyIncidentDto {
  @IsOptional() @IsIn(['low', 'medium', 'high', 'critical']) severity?: string;
  @IsOptional() @IsIn(['new', 'triaged', 'investigating', 'resolved', 'closed']) status?: string;
  @IsOptional() @IsUUID() assigneeAdminUserId?: string;
}

export class SafetyFindingDto {
  @IsString() @IsNotEmpty() @MaxLength(5000) finding!: string;
}

export class ResolveSafetyIncidentDto {
  @IsString() @IsNotEmpty() @MaxLength(5000) resolution!: string;
}

export class RestrictListingDto {
  @IsString() @IsNotEmpty() @MaxLength(500) reason!: string;
}
