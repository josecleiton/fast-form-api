import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExamAgreementUniqueCodeSendedAt1625002603968
  implements MigrationInterface
{
  name = 'ExamAgreementUniqueCodeSendedAt1625002603968';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` ADD `unique_code_sended_at` datetime NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` DROP COLUMN `unique_code_sended_at`',
    );
  }
}
