import { BadRequestException } from '@nestjs/common';
import { MobileConfigService } from './mobile-config.service';

describe('MobileConfigService', () => {
  const repository = { findOne: jest.fn(), create: jest.fn((value) => value), save: jest.fn((value) => value) };
  const service = new MobileConfigService(repository as never, {} as never);
  const actor = { admin: { id: 'admin' }, sessionId: 'session' } as never;

  beforeEach(() => jest.clearAllMocks());

  it('rejects executable remote configuration', async () => {
    await expect(service.create({ platform: 'all', audience: 'all', schemaVersion: 1, configuration: { content: '<script>alert(1)</script>' } }, actor)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('accepts versioned data-only configuration', async () => {
    repository.findOne.mockResolvedValue(null);
    const result = await service.create({ platform: 'android', audience: 'all', schemaVersion: 1, configuration: { featureFlags: { volunteerProgramme: true } } }, actor);
    expect(result).toMatchObject({ publishedVersion: 1, status: 'draft' });
  });
});
