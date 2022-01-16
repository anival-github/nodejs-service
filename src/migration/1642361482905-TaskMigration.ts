import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class TaskMigration1642361482905 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "task_class",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "order",
                    type: "int4",
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "userId",
                    type: "varchar",
                },
                {
                    name: "boardId",
                    type: "varchar",
                },
                {
                    name: "columnId",
                    type: "varchar",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("task_class");
    }

}
