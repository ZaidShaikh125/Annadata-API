import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('pickups')
export class Pickup { @PrimaryGeneratedColumn('uuid') id!: string; @Column({ default: 'scheduled' }) status!: string; @Column({ default: 0 }) quantity!: number; @Column({ type: 'timestamptz', nullable: true }) scheduledAt!: Date | null; }
