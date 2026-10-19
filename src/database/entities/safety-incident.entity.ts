import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('safety_incidents')
export class SafetyIncident { @PrimaryGeneratedColumn('uuid') id!: string; @Column() title!: string; @Column({ default: 'medium' }) severity!: string; @Column({ default: 'new' }) status!: string; @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) createdAt!: Date; }
