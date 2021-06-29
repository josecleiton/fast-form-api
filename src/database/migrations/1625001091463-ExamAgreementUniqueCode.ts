import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExamAgreementUniqueCode1625001091462
  implements MigrationInterface
{
  name = 'GracefulUniqueCodeOnExamAgreement1625001091462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_2b38bb607ef3e86920e9bd0163` ON `exam_agreement`',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` CHANGE `uuid` `unique_code` varchar(36) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` ADD UNIQUE INDEX `IDX_040052dd4f7f2aa588ac15c22e` (`unique_code`)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` DROP INDEX `IDX_040052dd4f7f2aa588ac15c22e`',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` CHANGE `unique_code` `uuid` varchar(36) NOT NULL',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `IDX_2b38bb607ef3e86920e9bd0163` ON `exam_agreement` (`uuid`)',
    );
  }
}
