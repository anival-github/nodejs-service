import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TaskMigration1643594212877 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'order',
            type: 'int4',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'userId',
            type: 'varchar',
          },
          {
            name: 'boardId',
            type: 'varchar',
          },
          {
            name: 'columnId',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'board',
            referencedColumnNames: ['id'],
            columnNames: ['boardId'],
            onDelete: 'CASCADE',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('task_class');
  }
}
