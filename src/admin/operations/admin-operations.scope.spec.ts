import { ForbiddenException } from '@nestjs/common';
import { AdminOperationsService } from './admin-operations.service';

describe('AdminOperationsService geography scope',()=>{
  it('prevents access to a user outside the administrator geography scope',async()=>{
    const users={findOne:jest.fn().mockResolvedValue({id:'user',geography:'Mumbai'})};
    const service=new AdminOperationsService(users as never,{} as never,{} as never,{} as never,{} as never);
    const actor={sessionId:'session',admin:{geographyScopes:['Pune']}} as never;
    await expect(service.getUser('user',actor)).rejects.toBeInstanceOf(ForbiddenException);
  });
});
