import {MigrationInterface, QueryRunner} from "typeorm";

export class PeriodIndex1624547816204 implements MigrationInterface {
    name = 'PeriodIndex1624547816204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `exam` DROP FOREIGN KEY `FK_ba483ad17eb41fb181aa3a77d4f`");
        await queryRunner.query("ALTER TABLE `exam` CHANGE `period_id` `period_id` int NOT NULL");
        await queryRunner.query("CREATE INDEX `IX_period_started_at_ended_at` ON `period` (`started_at`, `ended_at`)");
        await queryRunner.query("ALTER TABLE `exam` ADD CONSTRAINT `FK_ba483ad17eb41fb181aa3a77d4f` FOREIGN KEY (`period_id`) REFERENCES `period`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `exam` DROP FOREIGN KEY `FK_ba483ad17eb41fb181aa3a77d4f`");
        await queryRunner.query("DROP INDEX `IX_period_started_at_ended_at` ON `period`");
        await queryRunner.query("ALTER TABLE `exam` CHANGE `period_id` `period_id` int NULL");
        await queryRunner.query("ALTER TABLE `exam` ADD CONSTRAINT `FK_ba483ad17eb41fb181aa3a77d4f` FOREIGN KEY (`period_id`) REFERENCES `period`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
