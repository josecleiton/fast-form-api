import { MigrationInterface, QueryRunner } from 'typeorm';

const targets = ["Student", "Professor"];

export class ExamTarget1622326106015 implements MigrationInterface {
  name = 'ExamTarget1622326106015';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IX_question_group_target` ON `question_group`',
    );
    await queryRunner.query(
      "CREATE TABLE `exam_target` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `type` enum ('Student', 'Professor') NOT NULL, UNIQUE INDEX `IDX_988f784cc581e38b7ed4943006` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await Promise.all(targets.map(target => queryRunner.query('INSERT INTO `exam_target` (`type`) VALUES (?)', [target])));
    await queryRunner.query(
      'CREATE TABLE `exam_targets_exam_target` (`exam_id` int NOT NULL, `exam_target_id` int NOT NULL, INDEX `IDX_4a22969058fa5105ad6bee583f` (`exam_id`), INDEX `IDX_af1604ea5493f65a6c8d70d98e` (`exam_target_id`), PRIMARY KEY (`exam_id`, `exam_target_id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `question_group` DROP COLUMN `target`',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_targets_exam_target` ADD CONSTRAINT `FK_4a22969058fa5105ad6bee583f1` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_targets_exam_target` ADD CONSTRAINT `FK_af1604ea5493f65a6c8d70d98ed` FOREIGN KEY (`exam_target_id`) REFERENCES `exam_target`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `exam_targets_exam_target` DROP FOREIGN KEY `FK_af1604ea5493f65a6c8d70d98ed`',
    );
    await queryRunner.query(
      'ALTER TABLE `exam_targets_exam_target` DROP FOREIGN KEY `FK_4a22969058fa5105ad6bee583f1`',
    );
    await queryRunner.query(
      "ALTER TABLE `question_group` ADD `target` enum ('Student', 'Professor') NULL",
    );
    await queryRunner.query(
      'DROP INDEX `IDX_af1604ea5493f65a6c8d70d98e` ON `exam_targets_exam_target`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_4a22969058fa5105ad6bee583f` ON `exam_targets_exam_target`',
    );
    await queryRunner.query('DROP TABLE `exam_targets_exam_target`');
    await queryRunner.query(
      'DROP INDEX `IDX_988f784cc581e38b7ed4943006` ON `exam_target`',
    );
    await queryRunner.query('DROP TABLE `exam_target`');
    await queryRunner.query(
      'CREATE INDEX `IX_question_group_target` ON `question_group` (`target`)',
    );
  }
}
