import { MigrationInterface, QueryRunner } from 'typeorm';

export class Auxiliary1620477175799 implements MigrationInterface {
  name = 'Auxiliary1620477175799';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `exam` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `text` text NOT NULL, `description` text NOT NULL, `started_at` datetime NOT NULL, `ended_at` datetime NOT NULL, `allow_anonymous` tinyint NOT NULL DEFAULT 0, `status` enum ('active', 'inactive') NOT NULL, `period_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
    await queryRunner.query(
      'CREATE TABLE `period` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NULL, `stated_at` datetime NOT NULL, `ended_at` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `course` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `code` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, UNIQUE INDEX `IDX_5cf4963ae12285cda6432d5a3a` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `subject` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `code` varchar(255) NOT NULL, `title` varchar(255) NOT NULL, `code_id` int NOT NULL, `course_id` int NULL, UNIQUE INDEX `IDX_92374adc6b583e8cf659977e48` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `grade` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `subject_id` int NULL, `period_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `exam_agreement` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(255) NOT NULL, `anonymous` tinyint NOT NULL, `user_id` int NOT NULL, UNIQUE INDEX `IDX_2b38bb607ef3e86920e9bd0163` (`uuid`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `question_group` ADD `personal` tinyint NOT NULL DEFAULT 0',
    );
    await queryRunner.query(
      'ALTER TABLE `question_group` ADD `exam_id` int NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `question` DROP FOREIGN KEY `FK_3b2789ae1c494ff1bf8dd4d4607`',
    );
    await queryRunner.query(
      'ALTER TABLE `question` CHANGE `group_id` `group_id` int NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `question_group` CHANGE `class` `class` tinyint NOT NULL DEFAULT 0',
    );
    await queryRunner.query(
      'ALTER TABLE `question` ADD CONSTRAINT `FK_3b2789ae1c494ff1bf8dd4d4607` FOREIGN KEY (`group_id`) REFERENCES `question_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `question_group` ADD CONSTRAINT `FK_1d110bd5138b275a2ea2944e290` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `exam` ADD CONSTRAINT `FK_ba483ad17eb41fb181aa3a77d4f` FOREIGN KEY (`period_id`) REFERENCES `period`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `subject` ADD CONSTRAINT `FK_b9db72ddc93f196bf9d79132171` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `grade` ADD CONSTRAINT `FK_b472107b61171823120f069fd50` FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE `grade` ADD CONSTRAINT `FK_d35fb46683694975ba85bcd804e` FOREIGN KEY (`period_id`) REFERENCES `period`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `grade` DROP FOREIGN KEY `FK_d35fb46683694975ba85bcd804e`',
    );
    await queryRunner.query(
      'ALTER TABLE `grade` DROP FOREIGN KEY `FK_b472107b61171823120f069fd50`',
    );
    await queryRunner.query(
      'ALTER TABLE `subject` DROP FOREIGN KEY `FK_b9db72ddc93f196bf9d79132171`',
    );
    await queryRunner.query(
      'ALTER TABLE `exam` DROP FOREIGN KEY `FK_ba483ad17eb41fb181aa3a77d4f`',
    );
    await queryRunner.query(
      'ALTER TABLE `question_group` DROP FOREIGN KEY `FK_1d110bd5138b275a2ea2944e290`',
    );
    await queryRunner.query(
      'ALTER TABLE `question` DROP FOREIGN KEY `FK_3b2789ae1c494ff1bf8dd4d4607`',
    );
    await queryRunner.query(
      'ALTER TABLE `question_group` CHANGE `class` `class` tinyint NOT NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `question` CHANGE `group_id` `group_id` int NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `question` ADD CONSTRAINT `FK_3b2789ae1c494ff1bf8dd4d4607` FOREIGN KEY (`group_id`) REFERENCES `question_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE `exam` DROP COLUMN `period_id`');
    await queryRunner.query('ALTER TABLE `exam` DROP COLUMN `status`');
    await queryRunner.query('ALTER TABLE `exam` DROP COLUMN `allow_anonymous`');
    await queryRunner.query('ALTER TABLE `exam` DROP COLUMN `ended_at`');
    await queryRunner.query('ALTER TABLE `exam` DROP COLUMN `started_at`');
    await queryRunner.query('ALTER TABLE `exam` DROP COLUMN `description`');
    await queryRunner.query('ALTER TABLE `exam` DROP COLUMN `text`');
    await queryRunner.query(
      'ALTER TABLE `question_group` DROP COLUMN `exam_id`',
    );
    await queryRunner.query(
      'ALTER TABLE `question_group` DROP COLUMN `personal`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_2b38bb607ef3e86920e9bd0163` ON `exam_agreement`',
    );
    await queryRunner.query('DROP TABLE `exam_agreement`');
    await queryRunner.query('DROP TABLE `grade`');
    await queryRunner.query(
      'DROP INDEX `IDX_92374adc6b583e8cf659977e48` ON `subject`',
    );
    await queryRunner.query('DROP TABLE `subject`');
    await queryRunner.query(
      'DROP INDEX `IDX_5cf4963ae12285cda6432d5a3a` ON `course`',
    );
    await queryRunner.query('DROP TABLE `course`');
    await queryRunner.query('DROP TABLE `period`');
  }
}
