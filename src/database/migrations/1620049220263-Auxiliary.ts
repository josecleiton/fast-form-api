import {MigrationInterface, QueryRunner} from "typeorm";

export class Auxiliary1620049220263 implements MigrationInterface {
    name = 'Auxiliary1620049220263'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `answer` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `score` int NULL, `type` enum ('Answer', 'AnswerGrade') NOT NULL, `exam_agreement_id` int NULL, `grade_id` int NULL, INDEX `IDX_ec3a69def9f89a993b8f75ee4d` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `exam` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("DROP INDEX `IDX_31ef2b4d30675d0c15056b7f6e` ON `user`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `type`");
        await queryRunner.query("ALTER TABLE `user` ADD `type` enum ('Professor', 'Student', 'User') NOT NULL");
        await queryRunner.query("CREATE INDEX `IDX_31ef2b4d30675d0c15056b7f6e` ON `user` (`type`)");
        await queryRunner.query("ALTER TABLE `subject` ADD CONSTRAINT `FK_b9db72ddc93f196bf9d79132171` FOREIGN KEY (`course_id`) REFERENCES `course`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `grade` ADD CONSTRAINT `FK_b472107b61171823120f069fd50` FOREIGN KEY (`subject_id`) REFERENCES `subject`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `grade` ADD CONSTRAINT `FK_d35fb46683694975ba85bcd804e` FOREIGN KEY (`period_id`) REFERENCES `period`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_814144bcce3b80921f41f15b823` FOREIGN KEY (`exam_agreement_id`) REFERENCES `exam_agreement`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_971014f1fb44be716098484bb5a` FOREIGN KEY (`grade_id`) REFERENCES `grade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_971014f1fb44be716098484bb5a`");
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_814144bcce3b80921f41f15b823`");
        await queryRunner.query("ALTER TABLE `grade` DROP FOREIGN KEY `FK_d35fb46683694975ba85bcd804e`");
        await queryRunner.query("ALTER TABLE `grade` DROP FOREIGN KEY `FK_b472107b61171823120f069fd50`");
        await queryRunner.query("ALTER TABLE `subject` DROP FOREIGN KEY `FK_b9db72ddc93f196bf9d79132171`");
        await queryRunner.query("DROP INDEX `IDX_31ef2b4d30675d0c15056b7f6e` ON `user`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `type`");
        await queryRunner.query("ALTER TABLE `user` ADD `type` varchar(255) NOT NULL");
        await queryRunner.query("CREATE INDEX `IDX_31ef2b4d30675d0c15056b7f6e` ON `user` (`type`)");
        await queryRunner.query("DROP TABLE `exam`");
        await queryRunner.query("DROP INDEX `IDX_ec3a69def9f89a993b8f75ee4d` ON `answer`");
        await queryRunner.query("DROP TABLE `answer`");
    }

}
