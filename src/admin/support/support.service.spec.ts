import { ForbiddenException } from '@nestjs/common';
import { SupportService } from './support.service';

describe('SupportService resource scope',()=>{
  it('prevents a Support Agent from reading another agent\'s ticket',async()=>{
    const tickets={findOne:jest.fn().mockResolvedValue({id:'ticket',assignedAdminId:'other-admin'})};
    const service=new SupportService(tickets as never,{} as never,{} as never);
    const actor={sessionId:'session',admin:{id:'support-admin',roles:['Support Agent'],permissions:['support.read','support.reply']}} as never;
    await expect(service.detail('ticket',actor)).rejects.toBeInstanceOf(ForbiddenException);
  });
});
