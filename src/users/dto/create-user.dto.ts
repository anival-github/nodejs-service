import { OmitType } from '@nestjs/mapped-types';
import { BaseUser } from '../base-user';

export class CreateUserDto extends OmitType(BaseUser, ['id'] as const) {}
