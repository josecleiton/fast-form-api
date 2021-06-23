import {MigrationInterface, QueryRunner} from "typeorm";

export class Auxiliary1624416663574 implements MigrationInterface {
    name = 'Auxiliary1624416663574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `period` CHANGE `stated_at` `started_at` datetime NOT NULL");
        await queryRunner.query("CREATE TABLE `question_group_grade` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `class` tinyint NOT NULL DEFAULT 0, `personal` tinyint NOT NULL DEFAULT 0, `position` int NOT NULL DEFAULT '0', `exam_id` int NULL, INDEX `IX_question_group_position` (`position`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `professor_grade` (`user_id` int NOT NULL, `grade_id` int NOT NULL, INDEX `IDX_f2d35d0b9823628374f51931dd` (`user_id`), INDEX `IDX_df58a2a413f5647f6411002cb2` (`grade_id`), PRIMARY KEY (`user_id`, `grade_id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `student_grade` (`user_id` int NOT NULL, `grade_id` int NOT NULL, INDEX `IDX_7540599d89cb2b6e17cc56d517` (`user_id`), INDEX `IDX_26862c959c4ecfc8f1b4a1a055` (`grade_id`), PRIMARY KEY (`user_id`, `grade_id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `subject` DROP COLUMN `code_id`");
        await queryRunner.query("ALTER TABLE `exam_agreement` ADD `status` enum ('started', 'finished') NOT NULL DEFAULT 'started'");
        await queryRunner.query("ALTER TABLE `subject` DROP FOREIGN KEY `FK_b9db72ddc93f196bf9d79132171`");
        await queryRunner.query("ALTER TABLE `subject` CHANGE `course_id` `course_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `grade` DROP FOREIGN KEY `FK_b472107b61171823120f069fd50`");
        await queryRunner.query("ALTER TABLE `grade` DROP FOREIGN KEY `FK_d35fb46683694975ba85bcd804e`");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `subject_id` `subject_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `period_id` `period_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `subject` ADD CONSTRAINT `FK_b9db72ddc93f196bf9d79132171` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `grade` ADD CONSTRAINT `FK_b472107b61171823120f069fd50` FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `grade` ADD CONSTRAINT `FK_d35fb46683694975ba85bcd804e` FOREIGN KEY (`period_id`) REFERENCES `period`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `question_group_grade` ADD CONSTRAINT `FK_ba86f32978b67a878005c5af78a` FOREIGN KEY (`exam_id`) REFERENCES `exam`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `professor_grade` ADD CONSTRAINT `FK_f2d35d0b9823628374f51931ddd` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `professor_grade` ADD CONSTRAINT `FK_df58a2a413f5647f6411002cb28` FOREIGN KEY (`grade_id`) REFERENCES `grade`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `student_grade` ADD CONSTRAINT `FK_7540599d89cb2b6e17cc56d5170` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `student_grade` ADD CONSTRAINT `FK_26862c959c4ecfc8f1b4a1a055c` FOREIGN KEY (`grade_id`) REFERENCES `grade`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `student_grade` DROP FOREIGN KEY `FK_26862c959c4ecfc8f1b4a1a055c`");
        await queryRunner.query("ALTER TABLE `student_grade` DROP FOREIGN KEY `FK_7540599d89cb2b6e17cc56d5170`");
        await queryRunner.query("ALTER TABLE `professor_grade` DROP FOREIGN KEY `FK_df58a2a413f5647f6411002cb28`");
        await queryRunner.query("ALTER TABLE `professor_grade` DROP FOREIGN KEY `FK_f2d35d0b9823628374f51931ddd`");
        await queryRunner.query("ALTER TABLE `question_group_grade` DROP FOREIGN KEY `FK_ba86f32978b67a878005c5af78a`");
        await queryRunner.query("ALTER TABLE `grade` DROP FOREIGN KEY `FK_d35fb46683694975ba85bcd804e`");
        await queryRunner.query("ALTER TABLE `grade` DROP FOREIGN KEY `FK_b472107b61171823120f069fd50`");
        await queryRunner.query("ALTER TABLE `subject` DROP FOREIGN KEY `FK_b9db72ddc93f196bf9d79132171`");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `period_id` `period_id` int NULL");
        await queryRunner.query("ALTER TABLE `grade` CHANGE `subject_id` `subject_id` int NULL");
        await queryRunner.query("ALTER TABLE `grade` ADD CONSTRAINT `FK_d35fb46683694975ba85bcd804e` FOREIGN KEY (`period_id`) REFERENCES `period`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `grade` ADD CONSTRAINT `FK_b472107b61171823120f069fd50` FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `subject` CHANGE `course_id` `course_id` int NULL");
        await queryRunner.query("ALTER TABLE `subject` ADD CONSTRAINT `FK_b9db72ddc93f196bf9d79132171` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `exam_agreement` DROP COLUMN `status`");
        await queryRunner.query("ALTER TABLE `subject` ADD `code_id` int NOT NULL");
        await queryRunner.query("DROP INDEX `IDX_26862c959c4ecfc8f1b4a1a055` ON `student_grade`");
        await queryRunner.query("DROP INDEX `IDX_7540599d89cb2b6e17cc56d517` ON `student_grade`");
        await queryRunner.query("DROP TABLE `student_grade`");
        await queryRunner.query("DROP INDEX `IDX_df58a2a413f5647f6411002cb2` ON `professor_grade`");
        await queryRunner.query("DROP INDEX `IDX_f2d35d0b9823628374f51931dd` ON `professor_grade`");
        await queryRunner.query("DROP TABLE `professor_grade`");
        await queryRunner.query("DROP INDEX `IX_question_group_position` ON `question_group_grade`");
        await queryRunner.query("DROP TABLE `question_group_grade`");
        await queryRunner.query("ALTER TABLE `period` CHANGE `started_at` `stated_at` datetime NOT NULL");
    }

}
