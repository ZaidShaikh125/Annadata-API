import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity('report_definitions')
export class ReportDefinition { @PrimaryGeneratedColumn('uuid') id!: string; @Column({ unique: true }) key!: string; @Column() name!: string; @Column() category!: string; @Column('text', { array: true, default: '{}' }) allowedFields!: string[]; @Column({ type: 'jsonb', default: {} }) defaultFilters!: Record<string, unknown>; @Column({ default: true }) active!: boolean; @CreateDateColumn() createdAt!: Date; @UpdateDateColumn() updatedAt!: Date; }
