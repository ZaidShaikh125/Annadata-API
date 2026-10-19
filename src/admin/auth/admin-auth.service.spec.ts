import { UnauthorizedException } from '@nestjs/common';
import { jwtVerify } from 'jose';
import { AdminAuthService } from './admin-auth.service';

describe('AdminAuthService Entra validation', () => {
  const sessions={create:jest.fn(v=>v),save:jest.fn()}; const admins={findOne:jest.fn(),save:jest.fn()}; const audit={create:jest.fn(v=>v),save:jest.fn()};
  const service=new AdminAuthService(sessions as never,admins as never,audit as never);
  beforeEach(()=>{jest.clearAllMocks();process.env.ENTRA_TENANT_ID='tenant-a';process.env.ENTRA_AUDIENCE='api://annadata-admin';process.env.ENTRA_REQUIRED_SCOPE='Admin.Access'});
  afterAll(()=>{delete process.env.ENTRA_TENANT_ID;delete process.env.ENTRA_AUDIENCE;delete process.env.ENTRA_REQUIRED_SCOPE});
  it('rejects a token issued for another tenant',async()=>{(jwtVerify as jest.Mock).mockResolvedValue({payload:{tid:'tenant-b',oid:'object-id',scp:'Admin.Access'}});await expect(service.exchangeEntraToken('token',{})).rejects.toBeInstanceOf(UnauthorizedException)});
  it('rejects a token missing the required API scope',async()=>{(jwtVerify as jest.Mock).mockResolvedValue({payload:{tid:'tenant-a',oid:'object-id',scp:'User.Read'}});await expect(service.exchangeEntraToken('token',{})).rejects.toBeInstanceOf(UnauthorizedException)});
  it('rejects a valid tenant identity absent from the database allowlist',async()=>{(jwtVerify as jest.Mock).mockResolvedValue({payload:{tid:'tenant-a',oid:'object-id',scp:'Admin.Access'}});admins.findOne.mockResolvedValue(null);await expect(service.exchangeEntraToken('token',{})).rejects.toBeInstanceOf(UnauthorizedException)});
});
