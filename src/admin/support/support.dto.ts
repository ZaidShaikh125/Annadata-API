import { IsIn, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
export class SupportReplyDto { @IsString() @IsNotEmpty() @MaxLength(10000) body!: string; }
export class SupportAssignDto { @IsUUID() adminUserId!: string; }
export class SupportUpdateDto { @IsOptional() @IsIn(['low','normal','high','urgent']) priority?: string; @IsOptional() @IsIn(['new','open','assigned','waiting','resolved','closed']) status?: string; }
