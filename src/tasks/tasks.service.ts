import { Equal } from 'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { SearchTaskDto } from './dto/search-user.dto';
import { DeleteUserDto } from 'src/users/dto/delete-user.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  /**
   * Create one task
   * @param createTaskDto - object with task parameters;
   * @returns \{Promise\} Promise object represents newly create task
   */
  async create(createTaskDto: CreateTaskDto) {
    const task = new Task(createTaskDto);
    await this.tasksRepository.save(task);

    return task;
  }

  /**
   * Get all tasks
   * @returns \{Promise\} Promise object represents collection of tasks
   */
  async findAll() {
    const tasks = await this.tasksRepository.find();

    return tasks;
  }

  /**
   * Get one task by id
   * @param id - task id string
   * @returns \{Promise\} Promise object represents task with a passed id
   */
  async findOne(id: string) {
    const task = await this.tasksRepository.findOne(id);

    if (!task) {
      throw new HttpException('Task is not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  /**
   * Update task by id
   * @param id - task id string
   * @param updateTaskDto - data to update a particular task
   * @returns \{Promise\} Promise object represents updated task
   */
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const taskToUpdate = await this.tasksRepository.findOne(id);

    if (!taskToUpdate) {
      throw new HttpException('Task is not found', HttpStatus.NOT_FOUND);
    }

    const updatedTask = { ...taskToUpdate, ...updateTaskDto };

    await this.tasksRepository.save(updatedTask);
    return updatedTask;
  }

  /**
   * Update many tasks found using filter
   * @param filter - fields to filter tasks to be updated
   * @param updates - data to update each task
   */
  async updateMany(filter: SearchTaskDto, updates: UpdateTaskDto) {
    const tasksToUpdate = await this.tasksRepository.find({
      [filter.key]: Equal(filter.value),
    });

    const promises = tasksToUpdate.map((taskToUpdate: Task) => {
      const updatedTask = { ...taskToUpdate, ...updates };
      return this.tasksRepository.save(updatedTask);
    });

    await Promise.all(promises);
  }

  /**
   * Delete task by id
   * @param id - task id
   */
  async remove(id: string) {
    const taskToRemove = await this.tasksRepository.findOne(id);

    if (!taskToRemove) {
      throw new HttpException('Task is not found', HttpStatus.NOT_FOUND);
    }

    await this.tasksRepository.delete(id);
  }

  /**
   * Delete all filtered tasks
   * @param deleteUserDto - filter to search tasks to be deleted
   */
  async deleteMany(deleteUserDto: DeleteUserDto) {
    await this.tasksRepository.delete(deleteUserDto);
  }

  /**
   * Get all filtered tasks
   * @param filter - filter to search tasks with
   * @returns \{Promise\} Promise objects represents all tasks corresponding to the filter
   */
  async search(filter: SearchTaskDto) {
    const tasks = await this.tasksRepository.find({
      [filter.key]: Equal(filter.value),
    });

    return tasks;
  }
}
