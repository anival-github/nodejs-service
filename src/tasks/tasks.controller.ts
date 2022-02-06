import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@UseGuards(JwtAuthGuard)
@Controller('boards/:boardId/tasks/')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Get all tasks by board id
   * @param boardId - board id to find tasks by
   */
  @ApiOperation({
    summary: 'Get Tasks by boardId',
    description: 'Gets tasks by the Board ID (e.g. “/board/1/tasks”)',
  })
  @ApiResponse({ status: 200, type: [Task] })
  @Get()
  findTasksByBoardId(@Param('boardId', new ParseUUIDPipe()) boardId: string) {
    return this.tasksService.search({ key: 'boardId', value: boardId });
  }

  /**
   * Handle create request
   * @param createTaskDto - data for creating task
   */
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('boardId') boardId: string,
  ) {
    const dataToCreateTask = { ...createTaskDto, boardId };
    return this.tasksService.create(dataToCreateTask);
  }

  /**
   * Handle find all request
   */
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  /**
   * Handle get one request
   * @param id - id to find task by
   */
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.findOne(id);
  }

  /**
   * Handle update one request
   * @param id - id of task to be updated
   * @param updateTaskDto - data to update task with
   */
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  /**
   * Handle delete one request
   * @param id - id of task to be deleted
   */
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.remove(id);
  }
}
