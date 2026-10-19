import { Column, CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';
@Entity('admin_sessions')
export class AdminSession { @PrimaryColumn('uuid') id!: string; @Index() @Column() adminUserId!: string; @Column() expiresAt!: Date; @Column({ nullable: true }) revokedAt!: Date | null; @Column({ nullable: true }) ipAddress!: string | null; @Column({ nullable: true }) userAgent!: string | null; @Column({type:'timestamptz',nullable:true}) lastActivityAt!:Date|null; @CreateDateColumn() createdAt!: Date; }
