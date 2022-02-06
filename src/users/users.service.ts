import { TasksService } from './../tasks/tasks.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ReturnUserDto } from './dto/return-user.dto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private tasksService: TasksService,
    private bcryptService: BcryptService,
  ) {}

  /**
   * Get all users
   * @returns \{Promise\} Promise object represents collection of users
   */
  async findAll(): Promise<ReturnUserDto[]> {
    const users = await this.usersRepository.find();
    const result = users.map((user) => User.toResponse(user));
    return result;
  }

  /**
   * Get one user by id
   * @param id - user id string
   * @returns \{Promise\} Promise object represents user with a passed id
   */
  async findOne(id: string): Promise<ReturnUserDto> {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return User.toResponse(user);
  }

  /**
   * Delete user by id
   * @param id - user id string
   */
  async remove(id: string): Promise<void> {
    const userToRemove = this.usersRepository.findOne(id);

    if (!userToRemove) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    await this.usersRepository.delete(id);

    await this.tasksService.updateMany(
      { key: 'userId', value: id },
      { userId: null },
    );
  }

  /**
   * Create one user
   * @param createUserDto - object with name: string, login: string, password: string;
   * @returns \{Promise\} Promise object represents newly create user
   */
  async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const { password } = createUserDto;

    const userToCreate = {
      ...createUserDto,
      password: this.bcryptService.encript(password),
    };

    const user = new User(userToCreate);
    await this.usersRepository.save(user);

    return User.toResponse(user);
  }

  /**
   * Get one user by id
   * @param searchParameters - fields to find user by
   * @returns \{Promise\} Promise object represents found user
   */
  async search(searchParameters: SearchUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: searchParameters,
    });

    return user;
  }

  /**
   * Update user by id
   * @param id - user id string
   * @param updateUserDto - data to update a particular user
   * @returns \{Promise\} Promise object represents updated user
   */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ReturnUserDto> {
    const userToUpdate = await this.usersRepository.findOne(id);

    if (!userToUpdate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const { password } = updateUserDto;

    const passwordToSave = password
      ? this.bcryptService.encript(password)
      : userToUpdate.login;

    const updatedUser = {
      ...userToUpdate,
      ...updateUserDto,
      password: passwordToSave,
    };

    await this.usersRepository.save(updatedUser);

    return User.toResponse(updatedUser);
  }
}
