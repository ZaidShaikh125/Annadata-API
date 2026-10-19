import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('audit_events')
export class AuditEvent { @PrimaryGeneratedColumn('uuid') id!: string; @Column({ nullable: true }) actorAdminUserId!: string | null; @Column() action!: string; @Column() entityType!: string; @Column({ nullable: true }) entityId!: string | null; @Column() outcome!: string; @Column({ nullable: true }) correlationId!: string | null; @Column({ type: 'jsonb', default: {} }) metadata!: Record<string, unknown>; @CreateDateColumn() createdAt!: Date; }
