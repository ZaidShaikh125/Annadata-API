import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('platform_settings')
export class PlatformSetting { @PrimaryGeneratedColumn('uuid') id!: string; @Column() category!: string; @Column() key!: string; @Column({ type: 'jsonb' }) value!: unknown; @Column() version!: number; @Column() updatedByAdminId!: string; @Column({ default: true }) active!: boolean; @CreateDateColumn() createdAt!: Date; }
