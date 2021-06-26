import { MigrationInterface, QueryRunner } from 'typeorm';

export class AnswerScoreCheck1624750140568 implements MigrationInterface {
  name = 'AnswerScoreCheck1624750140568';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `answer` DROP COLUMN `score`');
    await queryRunner.query(
      'ALTER TABLE `answer` ADD `score` tinyint NULL CHECK (`score` IS NULL OR `score` BETWEEN 1 AND 5)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `answer` DROP COLUMN `score`');
    await queryRunner.query('ALTER TABLE `answer` ADD `score` int NULL');
  }
}
