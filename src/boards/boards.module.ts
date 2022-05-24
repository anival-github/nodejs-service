import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TasksModule } from 'src/tasks/tasks.module';
import { Board } from './entities/board.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    TasksModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
