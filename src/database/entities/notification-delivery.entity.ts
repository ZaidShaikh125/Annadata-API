import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('notification_deliveries')
export class NotificationDelivery { @PrimaryGeneratedColumn('uuid') id!: string; @Column() announcementId!: string; @Column() channel!: string; @Column({ default: 0 }) audienceSize!: number; @Column({ default: 0 }) sentCount!: number; @Column({ default: 0 }) failedCount!: number; @Column({ default: 'pending' }) status!: string; @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) createdAt!: Date; }
