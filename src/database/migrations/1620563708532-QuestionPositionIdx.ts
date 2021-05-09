import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionPositionIdx1620563708532 implements MigrationInterface {
    name = 'QuestionPositionIdx1620563708532'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_3b2789ae1c494ff1bf8dd4d4607`");
        await queryRunner.query("ALTER TABLE `question` CHANGE `group_id` `group_id` int NOT NULL");
        await queryRunner.query("CREATE INDEX `IX_question_position` ON `question` (`position`)");
        await queryRunner.query("CREATE INDEX `IX_question_group_position` ON `question_group` (`position`)");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_3b2789ae1c494ff1bf8dd4d4607` FOREIGN KEY (`group_id`) REFERENCES `question_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `question` DROP FOREIGN KEY `FK_3b2789ae1c494ff1bf8dd4d4607`");
        await queryRunner.query("DROP INDEX `IX_question_group_position` ON `question_group`");
        await queryRunner.query("DROP INDEX `IX_question_position` ON `question`");
        await queryRunner.query("ALTER TABLE `question` CHANGE `group_id` `group_id` int NULL");
        await queryRunner.query("ALTER TABLE `question` ADD CONSTRAINT `FK_3b2789ae1c494ff1bf8dd4d4607` FOREIGN KEY (`group_id`) REFERENCES `question_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
