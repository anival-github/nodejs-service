import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class BoardMigration1642361495452 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const dbs = await queryRunner.getDatabases();
        console.log('current databases: ', dbs);

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
