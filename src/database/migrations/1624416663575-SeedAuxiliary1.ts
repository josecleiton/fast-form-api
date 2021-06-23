import { addMonths, endOfMonth, startOfMonth } from 'date-fns';
import { MigrationInterface, QueryRunner } from 'typeorm';
import faker = require('faker');
import bcrypt = require('bcryptjs');

interface IEntity {
  id: number;
}

const defaultName = 'Gerado';
const student = {
  cpf: '50172241065',
  enrollment: '989898',
};

export class SeedAuxiliary1624412129413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO `period` (`name`, `started_at`, `ended_at`) VALUES (?, ?, ?)',
      [
        defaultName,
        startOfMonth(new Date()),
        endOfMonth(addMonths(new Date(), 5)),
      ],
    );
    const [
      period,
    ]: IEntity[] = await queryRunner.query(
      'SELECT `id` FROM `period` WHERE `name` = ?',
      [defaultName],
    );

    await queryRunner.query(
      'INSERT INTO `course` (`code`, `title`) VALUES (?, ?)',
      [defaultName, faker.random.alphaNumeric(20)],
    );
    const [
      course,
    ]: IEntity[] = await queryRunner.query(
      'SELECT `id` FROM `course` WHERE `code` = ?',
      [defaultName],
    );

    await queryRunner.query(
      'INSERT INTO `subject` (`code`, `title`, `course_id`) VALUES (?, ?, ?)',
      [defaultName, faker.random.alpha({ count: 20, upcase: true }), course.id],
    );
    const [
      subject,
    ]: IEntity[] = await queryRunner.query(
      'SELECT `id` FROM `subject` WHERE `code` = ?',
      [defaultName],
    );

    await queryRunner.query(
      'INSERT INTO `grade` (`subject_id`, `period_id`) VALUES (?, ?)',
      [subject.id, period.id],
    );
    const [
      grade,
    ]: IEntity[] = await queryRunner.query(
      'SELECT `id` FROM `grade` WHERE `subject_id` = ? AND `period_id` = ?',
      [subject.id, period.id],
    );

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD!, salt);

    await queryRunner.query(
      'INSERT INTO `auth` (`login`, `password`, `salt`) VALUES (?, ?, ?)',
      [student.enrollment, password, salt],
    );
    await queryRunner.query(
      'INSERT INTO `user` (`enrollment`, `cpf`, `type`, `role`) VALUES (?, ?, ?, ?)',
      [student.enrollment, student.cpf, 'Student', 'manager'],
    );
    const [
      user,
    ]: IEntity[] = await queryRunner.query(
      'SELECT `id` FROM `user` WHERE `enrollment` = ?',
      [student.enrollment],
    );

    await queryRunner.query(
      'INSERT INTO `student_grade` (`user_id`, `grade_id`) VALUES (?, ?)',
      [user.id, grade.id],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const [
      user,
    ]: IEntity[] = await queryRunner.query(
      'SELECT `id` FROM `user` WHERE `enrollment` = ?',
      [student.enrollment],
    );
    await queryRunner.query('DELETE FROM `student_grade` WHERE `user_id` = ?', [
      user.id,
    ]);
    await queryRunner.query('DELETE FROM `user` WHERE `enrollment` = ?', [
      student.enrollment,
    ]);
    await queryRunner.query('DELETE FROM `auth` WHERE `login` = ?', [
      student.enrollment,
    ]);

    const [
      period,
    ]: IEntity[] = await queryRunner.query(
      'SELECT `id` FROM `period` WHERE `name` = ?',
      [defaultName],
    );
    const [
      course,
    ]: IEntity[] = await queryRunner.query(
      'SELECT `id` FROM `course` WHERE `code` = ?',
      [defaultName],
    );
    const [
      subject,
    ]: IEntity[] = await queryRunner.query(
      'SELECT `id` FROM `subject` WHERE `code` = ?',
      [defaultName],
    );
    const [
      grade,
    ]: IEntity[] = await queryRunner.query(
      'SELECT `id` FROM `grade` WHERE `subject_id` = ? AND `period_id` = ?',
      [subject.id, period.id],
    );

    await queryRunner.query('DELETE FROM `subject` WHERE `id` = ?', [
      subject.id,
    ]);
    await queryRunner.query('DELETE FROM `course` WHERE `id` = ?', [course.id]);
    await queryRunner.query('DELETE FROM `grade` WHERE `id` = ?', [grade.id]);
    await queryRunner.query('DELETE FROM `period` WHERE `id` = ?', [period.id]);
  }
}
