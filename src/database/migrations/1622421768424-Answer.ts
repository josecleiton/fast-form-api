import {MigrationInterface, QueryRunner} from "typeorm";

export class Answer1622421768424 implements MigrationInterface {
    name = 'Answer1622421768424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `answer` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `score` int NULL, `type` enum ('Answer', 'AnswerGrade') NOT NULL, `exam_agreement_id` int NOT NULL, `question_id` int NOT NULL, `grade_id` int NULL, INDEX `IDX_ec3a69def9f89a993b8f75ee4d` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_814144bcce3b80921f41f15b823` FOREIGN KEY (`exam_agreement_id`) REFERENCES `exam_agreement`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_c3d19a89541e4f0813f2fe09194` FOREIGN KEY (`question_id`) REFERENCES `question`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `answer` ADD CONSTRAINT `FK_971014f1fb44be716098484bb5a` FOREIGN KEY (`grade_id`) REFERENCES `grade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_971014f1fb44be716098484bb5a`");
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_c3d19a89541e4f0813f2fe09194`");
        await queryRunner.query("ALTER TABLE `answer` DROP FOREIGN KEY `FK_814144bcce3b80921f41f15b823`");
        await queryRunner.query("DROP INDEX `IDX_ec3a69def9f89a993b8f75ee4d` ON `answer`");
        await queryRunner.query("DROP TABLE `answer`");
    }

}
