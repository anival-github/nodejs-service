import { v4 as uuidv4 } from 'uuid';

export interface IUserToResponse {
  id: string;
  name: string;
  login: string;
}

export interface IUserToCreate {
  name: string;
  login: string;
  password: string;
}

class User {
  id: string;

  name: string;

  login: string;

  password: string;

  /**
 * Return newly created User
 * @param user - object with user data
 * @returns new User
 */
  constructor({
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = uuidv4();
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
 * Return user withot secret field
 * @param user - http request class IncomingMessage
 * @returns object represents user without secret field
 */
  static toResponse(user: User): IUserToResponse {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

export default User;
