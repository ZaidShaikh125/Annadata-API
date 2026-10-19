import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
export class PickupDisputeDto { @IsString() @IsNotEmpty() @MaxLength(500) reason!: string; }
export class PickupQueryDto { @IsOptional() @IsString() status?: string; @IsOptional() @IsString() issueType?: string; }
