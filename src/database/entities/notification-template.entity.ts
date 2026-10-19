import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('notification_templates')
export class NotificationTemplate { @PrimaryGeneratedColumn('uuid') id!: string; @Column() name!: string; @Column() eventType!: string; @Column() channel!: string; @Column({ default: 'en' }) language!: string; @Column() subject!: string; @Column({ type: 'text' }) body!: string; @Column({ default: true }) enabled!: boolean; @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) updatedAt!: Date; }
