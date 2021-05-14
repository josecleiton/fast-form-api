import {MigrationInterface, QueryRunner} from "typeorm";

export class ExamTitle1621036457247 implements MigrationInterface {
    name = 'ExamTitle1621036457247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `exam` CHANGE `text` `title` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `exam` CHANGE `title` `text` text NOT NULL");
    }

}
