import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('support_messages')
export class SupportMessage { @PrimaryGeneratedColumn('uuid') id!: string; @Column() ticketId!: string; @Column() senderType!: string; @Column() senderId!: string; @Column() visibility!: string; @Column({ type: 'text' }) body!: string; @CreateDateColumn() createdAt!: Date; }
