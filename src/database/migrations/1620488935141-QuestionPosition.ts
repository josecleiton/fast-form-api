import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionPosition1620488935141 implements MigrationInterface {
    name = 'QuestionPosition1620488935141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question` ADD `position` int NOT NULL DEFAULT '0'");
        await queryRunner.query("ALTER TABLE `question_group` ADD `position` int NOT NULL DEFAULT '0'");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question_group` DROP COLUMN `position`");
        await queryRunner.query("ALTER TABLE `question` DROP COLUMN `position`");
    }

}
