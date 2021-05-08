import {MigrationInterface, QueryRunner} from "typeorm";

export class Exam1620478273991 implements MigrationInterface {
    name = 'Exam1620478273991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `exam` CHANGE `allow_anonymous` `allow_anonymous` tinyint NOT NULL DEFAULT 0");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `exam` CHANGE `allow_anonymous` `allow_anonymous` tinyint NOT NULL");
    }

}
