import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('communities')
export class Community { @PrimaryGeneratedColumn('uuid') id!: string; @Column() name!: string; @Column({ default: 'pending' }) verificationStatus!: string; @Column({ default: 'active' }) status!: string; @Column({ default: 0 }) memberCount!: number; @Column({ default: 0 }) activeListingCount!: number; @Column({ nullable: true }) geography!: string | null; @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) registeredAt!: Date; }
