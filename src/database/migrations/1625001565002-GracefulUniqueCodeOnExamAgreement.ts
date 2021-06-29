import { MigrationInterface, QueryRunner } from 'typeorm';

export class GracefulUniqueCodeOnExamAgreement1625001565001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'UPDATE `exam_agreement` SET `unique_code` = LPAD(CONVERT(ROUND(RAND() * 6379), CHAR), 8, "0")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'UPDATE `exam_agreement` SET `unique_code` = UUID()',
    );
  }
}
