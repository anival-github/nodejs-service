import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'src/bcrypt/bcrypt.service';
import { User } from 'src/users/entities/user.entity';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class UserMigration1643594217751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('LOG FROM USER MIGRATION');

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(100)',
          },
          {
            name: 'login',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
        ],
      }),
      true
    );

    const adminPasswordHash = await bcrypt.hash('admin', SALT_ROUNDS);

    const admin = new User({
      name: 'admin',
      login: 'admin',
      password: adminPasswordHash,
    });

    queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('user')
      .values([admin])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
  }
}
