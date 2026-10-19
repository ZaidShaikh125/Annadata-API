import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class VolunteerDecisionDto { @IsString() @IsNotEmpty() @MaxLength(500) reason!: string; }
export class CreateVolunteerTaskDto {
  @IsString() @IsNotEmpty() @MaxLength(200) title!: string;
  @IsUUID() communityId!: string;
  @IsString() @IsNotEmpty() @MaxLength(500) locationSummary!: string;
  @IsDateString() startsAt!: string;
  @IsDateString() endsAt!: string;
  @IsOptional() @IsString() @MaxLength(5000) instructions?: string;
}
export class AssignVolunteerDto { @IsUUID() volunteerId!: string; }
