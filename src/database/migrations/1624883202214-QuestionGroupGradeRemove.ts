import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuestionGroupGradeRemove1624883202213
  implements MigrationInterface
{
  name = 'QuestionGroupGradeRemove1624883202213';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `question_group_grade`');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `question_group_grade` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `class` tinyint NOT NULL DEFAULT 0, `personal` tinyint NOT NULL DEFAULT 0, `position` int NOT NULL DEFAULT '0', `exam_id` int NULL, INDEX `IX_question_group_position` (`position`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
    );
  }
}
