import {MigrationInterface, QueryRunner} from "typeorm";

export class Auth1619394209006 implements MigrationInterface {
    name = 'Auth1619394209006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `auth` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `login` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `salt` varchar(255) NOT NULL, UNIQUE INDEX `IDX_952e252e7470ff78b18a9ec786` (`login`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, `id` int NOT NULL AUTO_INCREMENT, `enrollment` varchar(255) NOT NULL, `cpf` varchar(255) NOT NULL, `type` varchar(255) NOT NULL DEFAULT 'student', UNIQUE INDEX `IDX_914f18c8fbe52b10a6b276bc0c` (`enrollment`), UNIQUE INDEX `IDX_a6235b5ef0939d8deaad755fc8` (`cpf`), INDEX `IDX_31ef2b4d30675d0c15056b7f6e` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_31ef2b4d30675d0c15056b7f6e` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_a6235b5ef0939d8deaad755fc8` ON `user`");
        await queryRunner.query("DROP INDEX `IDX_914f18c8fbe52b10a6b276bc0c` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP INDEX `IDX_952e252e7470ff78b18a9ec786` ON `auth`");
        await queryRunner.query("DROP TABLE `auth`");
    }

}
