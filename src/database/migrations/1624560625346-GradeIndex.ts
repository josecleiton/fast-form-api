import {MigrationInterface, QueryRunner} from "typeorm";

export class GradeIndex1624560625346 implements MigrationInterface {
    name = 'GradeIndex1624560625346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE INDEX `IX_question_group_class_examId` ON `question_group` (`class`, `exam_id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IX_question_group_class_examId` ON `question_group`");
    }

}
