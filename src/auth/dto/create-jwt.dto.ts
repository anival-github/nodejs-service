import { PickType } from '@nestjs/mapped-types';
import { BaseUser } from 'src/users/base-user';

export class CreateJwtDto extends PickType(BaseUser, [
  'login',
  'password',
] as const) {}
