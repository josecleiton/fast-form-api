import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEmail1625013724392 implements MigrationInterface {
  name = 'UserEmail1625013724392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `user` ADD `email` varchar(255) NULL');
    await queryRunner.query(
      'ALTER TABLE `user` ADD UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user` DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2`',
    );
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `email`');
  }
}
