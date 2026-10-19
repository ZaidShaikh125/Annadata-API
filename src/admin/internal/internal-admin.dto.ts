import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsBoolean, IsIn, IsNotEmpty, IsObject, IsString, MaxLength } from 'class-validator';
import { ROLE_PERMISSIONS } from '../auth/role-catalog';
export class UpdateAdminRolesDto { @IsArray() @ArrayNotEmpty() @ArrayMaxSize(3) @IsIn(Object.keys(ROLE_PERMISSIONS),{each:true}) roles!:string[]; }
export class SetAdminStatusDto { @IsBoolean() active!:boolean; @IsString() @IsNotEmpty() @MaxLength(500) reason!:string; }
export class UpdateSettingDto { @IsObject() value!:Record<string,unknown>; }
