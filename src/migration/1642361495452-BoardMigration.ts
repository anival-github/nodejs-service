import {MigrationInterface, QueryRunner, Table} from "typeorm";
import logger from "../common/logger";

export class BoardMigration1642361495452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        logger.info('Migration is applied');

        await queryRunner.createTable(new Table({
            name: "board_class",
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
                    name: "columns",
                    type: "varchar",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("board_class");
    }

}
