import { ApiOperation, ApiResponse } from '@nestjs/swagger';
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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TasksService } from 'src/tasks/tasks.service';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly tasksService: TasksService,
  ) {}

  /**
   * Handle get all boards request
   */
  @Get()
  @ApiOperation({
    summary: 'Get all boards',
    description: 'Returns all boards',
  })
  @ApiResponse({ status: 200, type: [Board] })
  findAll() {
    return this.boardsService.findAll();
  }

  /**
   * Get board by id
   * @param id - id to find board by
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get board by id',
    description: 'Gets the Board by ID (e.g. “/boards/123”)',
  })
  @ApiResponse({ status: 200, type: [Board] })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.boardsService.findOne(id);
  }

  /**
   * Handle create one board request
   * @param createBoardDto - data to create new board
   */
  @Post()
  @ApiOperation({
    summary: 'Create board',
    description: 'Creates a new board',
  })
  @ApiResponse({ status: 201, type: [Board] })
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  /**
   * Handle update one request
   * @param id - id to find board to be updated
   * @param updateBoardDto - new fields for board
   */
  @ApiOperation({
    summary: 'Update board',
    description: 'Updates a Board by ID',
  })
  @ApiResponse({ status: 200, type: [Board] })
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(id, updateBoardDto);
  }

  /**
   * Handle delete one request
   * @param id - id of board to be deleted
   */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete board',
    description:
      'Deletes a Board by ID. When somebody DELETE Board, all its Tasks should be deleted as well',
  })
  @ApiResponse({ status: 200, type: [Board] })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.boardsService.remove(id);
  }
}
