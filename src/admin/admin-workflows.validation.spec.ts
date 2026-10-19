import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateAnnouncementDto, ScheduleAnnouncementDto } from './notifications/notification-operations.dto';
import { UpdateSafetyIncidentDto } from './safety/safety-investigations.dto';
import { CreateVolunteerTaskDto } from './volunteers/volunteer-operations.dto';

describe('admin workflow input validation', () => {
  it('rejects unsupported safety severity values', async () => {
    const errors = await validate(plainToInstance(UpdateSafetyIncidentDto, { severity: 'catastrophic' }));
    expect(errors).toHaveLength(1);
  });

  it('requires valid volunteer task identifiers and timestamps', async () => {
    const errors = await validate(plainToInstance(CreateVolunteerTaskDto, { title: 'Pickup support', communityId: 'invalid', locationSummary: 'Pune', startsAt: 'tomorrow', endsAt: 'later' }));
    expect(errors.length).toBeGreaterThanOrEqual(3);
  });

  it('rejects unsupported announcement channels', async () => {
    const errors = await validate(plainToInstance(CreateAnnouncementDto, { title: 'Notice', body: 'Body', audience: { geography: 'Pune' }, channel: 'whatsapp', language: 'en' }));
    expect(errors).toHaveLength(1);
  });

  it('requires an ISO date for scheduled announcements', async () => {
    const errors = await validate(plainToInstance(ScheduleAnnouncementDto, { scheduledAt: 'next week' }));
    expect(errors).toHaveLength(1);
  });
});
