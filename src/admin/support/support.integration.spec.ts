import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AdminAuthService } from '../auth/admin-auth.service';
import { AdminSessionGuard } from '../auth/admin-session.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';

describe('Support admin HTTP integration', () => {
  let app: INestApplication;
  const support = { list: jest.fn().mockResolvedValue([]), note: jest.fn(), reply: jest.fn(), detail: jest.fn(), assign: jest.fn(), update: jest.fn() };
  const auth = { validateSession: jest.fn(async (token: string) => token === 'valid-session' ? { id: 'admin', roles: ['Platform Admin'], permissions: ['support.read','support.manage','support.reply'] } : null) };

  beforeAll(async () => {
    const module = await Test.createTestingModule({ controllers: [SupportController], providers: [{ provide: SupportService, useValue: support }, { provide: AdminAuthService, useValue: auth }, AdminSessionGuard, PermissionsGuard, Reflector] }).compile();
    app = module.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    await app.init();
  });
  afterAll(() => app.close());

  it('rejects requests without an opaque admin session', () => request(app.getHttpServer()).get('/api/v1/admin/support/tickets').expect(401));
  it('returns authorized support queues', () => request(app.getHttpServer()).get('/api/v1/admin/support/tickets').set('Authorization','Bearer valid-session').expect(200, []));
  it('rejects an empty internal note before service execution', () => request(app.getHttpServer()).post('/api/v1/admin/support/tickets/ticket-id/notes').set('Authorization','Bearer valid-session').send({ body: '' }).expect(400));
});
