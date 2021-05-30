import { MigrationInterface, QueryRunner } from 'typeorm';

const addTargets = ['Course', 'Grade'];

export class ExamTargetAdd1622378888497 implements MigrationInterface {
  name = 'ExamTargetAdd1622378888497';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `exam_target` CHANGE `type` `type` enum ('Student', 'Professor', 'Course', 'Grade') NOT NULL",
    );
    await Promise.all(
      addTargets.map((target) =>
        queryRunner.query('INSERT INTO exam_target (`type`) VALUES (?)', [
          target,
        ]),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM exam_target WHERE type IN (${addTargets
        .map((_) => '?')
        .join(', ')})`,
      [...addTargets],
    );
    await queryRunner.query(
      "ALTER TABLE `exam_target` CHANGE `type` `type` enum ('Student', 'Professor') NOT NULL",
    );
  }
}
