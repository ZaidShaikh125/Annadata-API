import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('user_accounts')
export class UserAccount { @PrimaryGeneratedColumn('uuid') id!: string; @Column() displayName!: string; @Column({ default: 'active' }) status!: string; @Column({ default: false }) verified!: boolean; @Column({ default: 'individual' }) accountType!: string; @Column({ nullable: true }) geography!: string | null; @Column({ type: 'timestamptz', nullable: true }) lastActivityAt!: Date | null; @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) registeredAt!: Date; }
