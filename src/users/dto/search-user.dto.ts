import { PartialType } from '@nestjs/mapped-types';
import { BaseUser } from '../base-user';

export class SearchUserDto extends PartialType(BaseUser) {}
