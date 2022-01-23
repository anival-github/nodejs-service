import { Entity, PrimaryColumn, Column } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type UserToResponseType = Omit<IUser, 'password'>;
export type UserDtoType = Omit<IUser, 'id'>;
export type LoginDtoType = Pick<IUser, 'login' | 'password'>;

@Entity()
class User implements IUser {

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
  constructor({
    name,
    login,
    password,
  }: UserDtoType = {
    name: 'USER',
    login: 'user',
    password: 'P@55w0rd',
  }) {
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
  static toResponse(user: User): UserToResponseType {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
