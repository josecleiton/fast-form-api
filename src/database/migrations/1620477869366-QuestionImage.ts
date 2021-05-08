import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionImage1620477869366 implements MigrationInterface {
    name = 'QuestionImage1620477869366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_3b2789ae1c494ff1bf8dd4d4607`");
        await queryRunner.query("ALTER TABLE `question` CHANGE `image_url` `image_url` text NULL");
        await queryRunner.query("ALTER TABLE `question` CHANGE `image_alt` `image_alt` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `question` CHANGE `group_id` `group_id` int NULL");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_3b2789ae1c494ff1bf8dd4d4607` FOREIGN KEY (`group_id`) REFERENCES `question_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_3b2789ae1c494ff1bf8dd4d4607`");
        await queryRunner.query("ALTER TABLE `question` CHANGE `group_id` `group_id` int NOT NULL");
        await queryRunner.query("ALTER TABLE `question` CHANGE `image_alt` `image_alt` varchar(255) NOT NULL DEFAULT ''");
        await queryRunner.query("ALTER TABLE `question` CHANGE `image_url` `image_url` text NOT NULL");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_3b2789ae1c494ff1bf8dd4d4607` FOREIGN KEY (`group_id`) REFERENCES `question_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
