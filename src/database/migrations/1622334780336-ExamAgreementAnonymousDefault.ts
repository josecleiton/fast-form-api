import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExamAgreementAnonymousDefault1622334780336
  implements MigrationInterface {
  name = 'ExamAgreementAnonymousDefault1622334780336';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` CHANGE `anonymous` `anonymous` tinyint NOT NULL DEFAULT 0',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` CHANGE `anonymous` `anonymous` tinyint NOT NULL',
    );
  }
}
