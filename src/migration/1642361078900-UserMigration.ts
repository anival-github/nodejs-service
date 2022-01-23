import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { encript } from "../common/encripting";
import User from "../entity/user.entity";

export class UserMigration1642361078900 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar(100)",
                },
                {
                    name: "login",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                }
            ]
        }), true);

        const adminPasswordHash = await encript('admin');

        const admin = new User({
            name: 'admin',
            login: 'admin',
            password: adminPasswordHash,
        });

        queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into("user")
            .values([admin])
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }
}
