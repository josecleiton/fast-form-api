import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionGroup1620179231630 implements MigrationInterface {
    name = 'QuestionGroup1620179231630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `question` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `statement` text NOT NULL, `image_url` text NOT NULL, `image_alt` varchar(255) NOT NULL DEFAULT '', `required` tinyint NOT NULL DEFAULT 1, `group_id` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `question_group` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `class` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_3b2789ae1c494ff1bf8dd4d4607` FOREIGN KEY (`group_id`) REFERENCES `question_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_3b2789ae1c494ff1bf8dd4d4607`");
        await queryRunner.query("DROP TABLE `question_group`");
        await queryRunner.query("DROP TABLE `question`");
    }

}
