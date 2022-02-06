import { OmitType } from '@nestjs/mapped-types';
import { BaseUser } from '../base-user';

export class ReturnUserDto extends OmitType(BaseUser, ['password'] as const) {}
