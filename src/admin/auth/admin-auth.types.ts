import type { AdminUser } from '../../database/entities/admin-user.entity';
export type AdminRequestUser = { sessionId: string; admin: AdminUser };
