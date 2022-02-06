import { Entity, PrimaryColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { ReturnUserDto } from '../dto/return-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { BaseUser } from '../base-user';

@Entity()
export class User extends BaseUser {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @PrimaryColumn()
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  /**
   * Return newly created User
   * @param user - object with user data
   * @returns new User
   */
  constructor(
    { name, login, password }: CreateUserDto = {
      name: 'USER',
      login: 'user',
      password: 'P@55w0rd',
    },
  ) {
    super();
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Return user withot secret field
   * @param user - object with all user params
   * @returns object represents user without secret field
   */
  static toResponse(user: User): ReturnUserDto {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
