import { IsObject, IsOptional, IsUUID } from 'class-validator';
export class RunReportDto { @IsOptional() @IsObject() filters?: Record<string, unknown>; }
export class CreateExportDto { @IsUUID() reportRunId!: string; }
