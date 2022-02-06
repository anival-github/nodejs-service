import { Equal } from 'typeorm';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { SearchBoardDto } from './dto/search-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  /**
   * Create one board
   * @param createBoardDto - object with board parameters;
   * @returns \{Promise\} Promise object represents newly create board
   */
  async create(createBoardDto: CreateBoardDto) {
    const newBoard = new Board(createBoardDto);

    await this.boardsRepository.save(newBoard);

    return newBoard;
  }

  /**
   * Get all boards
   * @returns \{Promise\} Promise object represents collection of boards
   */
  async findAll() {
    const boards = await this.boardsRepository.find();
    return boards;
  }

  /**
   * Get all filtered boards
   * @param filter - object with key to search and value to compare
   * @returns \{Promise\} Promise objects represents all boards corresponding to the filter
   */
  async search(filter: SearchBoardDto) {
    const filteredBoards = await this.boardsRepository.find({
      [filter.key]: Equal(filter.value),
    });

    return filteredBoards;
  }

  /**
   * Get one board by id
   * @param id - board id
   * @returns \{Promise\} Promise object represents board with a passed id
   */
  async findOne(id: string) {
    const board = await this.boardsRepository.findOne(id);

    if (!board) {
      throw new HttpException('Board is not found', HttpStatus.NOT_FOUND);
    }

    return board;
  }

  /**
   * Update board by id
   * @param id - board id
   * @param updateBoardDto - data to update a particular board
   * @returns \{Promise\} Promise object represents updated board
   */
  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const boardToUpdate = await this.boardsRepository.findOne(id);

    if (!boardToUpdate) {
      throw new HttpException('Board is not found', HttpStatus.NOT_FOUND);
    }

    const updatedBoard = { ...boardToUpdate, ...updateBoardDto };
    await this.boardsRepository.save(updatedBoard);

    return updatedBoard;
  }

  /**
   * Update many boards found using filter
   * @param filter - object with key to search and value to compare
   * @param updates - data to update each board
   */
  async updateMany(filter: SearchBoardDto, updates: UpdateBoardDto) {
    const boardsToUpdate = await this.boardsRepository.find({
      [filter.key]: Equal(filter.value),
    });

    const promises = boardsToUpdate.map((boardToUpdate: Board) => {
      const updatedBoard = {
        ...boardToUpdate,
        ...updates,
      };

      return this.boardsRepository.save(updatedBoard);
    });

    await Promise.all(promises);
  }

  /**
   * Delete board by id
   * @param id - board id
   */
  async remove(id: string) {
    const item = await this.boardsRepository.findOne(id);

    if (!item) {
      throw new HttpException('Board not found', HttpStatus.NOT_FOUND);
    }

    await this.boardsRepository.delete(id);
  }

  /**
   * Delete boards by filter
   * @param filter - object with key to search and value to compare
   */
  async deleteMany(filter: SearchBoardDto) {
    await this.boardsRepository.delete({ [filter.key]: Equal(filter.value) });
  }
}
