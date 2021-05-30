import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExamAgreementObservation1622417032753
  implements MigrationInterface {
  name = 'ExamAgreementObservation1622417032753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` ADD `observation` text NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` DROP COLUMN `observation`',
    );
  }
}
