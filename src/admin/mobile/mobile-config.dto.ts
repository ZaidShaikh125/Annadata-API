import { IsIn,IsInt,IsObject,IsString,Max,Min } from 'class-validator';
export class CreateMobileConfigDto{@IsIn(['ios','android','all'])platform!:string;@IsString()audience!:string;@IsInt()@Min(1)@Max(100)schemaVersion!:number;@IsObject()configuration!:Record<string,unknown>}
