import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcryptjs';

const cpf = '29997856155';
const enrollment = '999999';

export class AdminUser1620299822480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const result:
      | {
          id: number;
        }[]
      | undefined = await queryRunner.manager.query(
      'SELECT id FROM user WHERE cpf = ? OR enrollment = ?',
      [cpf, enrollment],
    );

    if (!result?.length) {
      if (!process.env.ADMIN_PASSWORD) {
        throw new Error('ADMIN_PASSWORD env var not set');
      }

      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

      await queryRunner.manager.query(
        'INSERT INTO auth (login, password, salt) VALUES (?, ?, ?)',
        [enrollment, password, salt],
      );
      await queryRunner.manager.query(
        'INSERT INTO user (enrollment, cpf, type, role) VALUES (?, ?, ?, ?)',
        [enrollment, cpf, 'User', 'admin'],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.query('DELETE FROM auth WHERE login = ?', [
      enrollment,
    ]);
    await queryRunner.manager.query(
      'DELETE FROM user WHERE cpf = ? OR enrollment = ?',
      [cpf, enrollment],
    );
  }
}
