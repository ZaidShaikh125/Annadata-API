import { SnakeCaseNamingStrategy } from './snake-case-naming.strategy';

describe('SnakeCaseNamingStrategy', () => {
  const strategy = new SnakeCaseNamingStrategy();

  it('maps entity properties to migration column names', () => {
    expect(strategy.columnName('createdByAdminUserId', '', [])).toBe('created_by_admin_user_id');
    expect(strategy.columnName('idempotencyKey', '', [])).toBe('idempotency_key');
  });
});
