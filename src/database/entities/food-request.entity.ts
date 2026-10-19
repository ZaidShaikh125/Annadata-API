import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('food_requests')
export class FoodRequest { @PrimaryGeneratedColumn('uuid') id!: string; @Column() listingId!: string; @Column() requesterId!: string; @Column({ default: 0 }) quantity!: number; @Column({ default: 'pending' }) status!: string; @Column({ nullable: true }) reason!: string | null; @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' }) createdAt!: Date; @Column({ type: 'timestamptz', nullable: true }) updatedAt!: Date | null; }
