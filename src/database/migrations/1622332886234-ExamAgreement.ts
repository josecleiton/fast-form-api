import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExamAgreement1622332886234 implements MigrationInterface {
  name = 'ExamAgreement1622332886234';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` ADD `exam_id` int NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` CHANGE `uuid` `uuid` varchar(36) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` ADD CONSTRAINT `FK_20bfb4e7c97aa20956be86c6beb` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` ADD CONSTRAINT `FK_7bdc7fbb138980e5471e2a19366` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` DROP FOREIGN KEY `FK_7bdc7fbb138980e5471e2a19366`',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` DROP FOREIGN KEY `FK_20bfb4e7c97aa20956be86c6beb`',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` CHANGE `uuid` `uuid` varchar(255) NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_agreement` DROP COLUMN `exam_id`',
    );
  }
}
