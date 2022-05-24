import * as path from 'path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { BoardsModule } from './boards/boards.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Board } from './boards/entities/board.entity';
import { Task } from './tasks/entities/task.entity';
import { BcryptService } from './bcrypt/bcrypt.service';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { BoardMigration1643594195923 } from './migration/1643594195923-BoardMigration';
import { TaskMigration1643594212877 } from './migration/1643594212877-TaskMigration';
import { UserMigration1643594217751 } from './migration/1643594217751-UserMigration';
import { FileModule } from './file/file.module';
import { loggerConfig } from './Utils/logger.config';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    WinstonModule.forRoot(loggerConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 4000,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Board, Task],
      synchronize: false,
      logging: 'all',
      migrations: [
        BoardMigration1643594195923,
        TaskMigration1643594212877,
        UserMigration1643594217751,
      ],
      migrationsRun: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'static'),
      serveRoot: '/file',
    }),
    BoardsModule,
    UsersModule,
    TasksModule,
    AuthModule,
    BcryptModule,
    FileModule,
  ],
  controllers: [],
  providers: [BcryptService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
