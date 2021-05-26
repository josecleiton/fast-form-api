import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestionGroupTarget1621992475274 implements MigrationInterface {
  name = 'QuestionGroupTarget1621992475274';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `question_group` ADD `target` enum ('Student', 'Professor') NULL",
    );
    await queryRunner.query(
      'DROP INDEX `IDX_31ef2b4d30675d0c15056b7f6e` ON `user`',
    );
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `type`');
    await queryRunner.query(
      "ALTER TABLE `user` ADD `type` enum ('Professor', 'Student', 'User') NOT NULL",
    );
    await queryRunner.query(
      'CREATE INDEX `IX_question_group_target` ON `question_group` (`target`)',
    );
    await queryRunner.query(
      'CREATE INDEX `IDX_31ef2b4d30675d0c15056b7f6e` ON `user` (`type`)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_31ef2b4d30675d0c15056b7f6e` ON `user`',
    );
    await queryRunner.query(
      'DROP INDEX `IX_question_group_target` ON `question_group`',
    );
    await queryRunner.query('ALTER TABLE `user` DROP COLUMN `type`');
    await queryRunner.query(
      'ALTER TABLE `user` ADD `type` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'CREATE INDEX `IDX_31ef2b4d30675d0c15056b7f6e` ON `user` (`type`)',
    );
    await queryRunner.query(
      'ALTER TABLE `question_group` DROP COLUMN `target`',
    );
  }
}
