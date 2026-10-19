import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditEvent } from '../../database/entities/audit-event.entity';
import { Community } from '../../database/entities/community.entity';
import { FoodListing } from '../../database/entities/food-listing.entity';
import { UserAccount } from '../../database/entities/user-account.entity';
import type { AdminRequestUser } from '../auth/admin-auth.types';

@Injectable()
export class AdminOperationsService {
  constructor(@InjectRepository(UserAccount) private readonly users: Repository<UserAccount>, @InjectRepository(Community) private readonly communities: Repository<Community>, @InjectRepository(FoodListing) private readonly foods: Repository<FoodListing>, @InjectRepository(AuditEvent) private readonly audit: Repository<AuditEvent>) {}
  listUsers(search?: string) { const query = this.users.createQueryBuilder('user').orderBy('user.registeredAt', 'DESC'); if (search) query.where('user.displayName ILIKE :search', { search: `%${search}%` }); return query.getMany(); }
  async getUser(id: string) { const value = await this.users.findOne({ where: { id } }); if (!value) throw new NotFoundException('User not found.'); return value; }
  async setUserStatus(id: string, status: string, actor: AdminRequestUser, reason: string) { const user = await this.getUser(id); user.status = status; await this.users.save(user); await this.audit.save(this.audit.create({ actorAdminUserId: actor.admin.id, action: `user.${status}`, entityType: 'user_account', entityId: id, outcome: 'success', correlationId: null, metadata: { reason } })); return user; }
  listCommunities(status?: string) { return this.communities.find({ where: status ? { verificationStatus: status } : undefined, order: { registeredAt: 'DESC' } }); }
  async decideCommunity(id: string, decision: 'approved' | 'rejected', actor: AdminRequestUser, reason: string) { const community = await this.communities.findOne({ where: { id } }); if (!community) throw new NotFoundException('Community not found.'); community.verificationStatus = decision; await this.communities.save(community); await this.audit.save(this.audit.create({ actorAdminUserId: actor.admin.id, action: `community.verification.${decision}`, entityType: 'community', entityId: id, outcome: 'success', correlationId: null, metadata: { reason } })); return community; }
  listFoods(status?: string) { return this.foods.find({ where: status ? { status } : undefined }); }
  async restrictFood(id: string, actor: AdminRequestUser, reason: string) { const food = await this.foods.findOne({ where: { id } }); if (!food) throw new NotFoundException('Food listing not found.'); food.status = 'restricted'; await this.foods.save(food); await this.audit.save(this.audit.create({ actorAdminUserId: actor.admin.id, action: 'food_listing.restricted', entityType: 'food_listing', entityId: id, outcome: 'success', correlationId: null, metadata: { reason } })); return food; }
}
