import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { FindExamByUserDto } from '../dtos/find-exam-by-user.dto';
import { ExamTarget } from '../entities/exam-target.entity';
import { Exam } from '../entities/exam.entity';
import { ExamAgreementStatus } from '../enums/exam-agreement-status.enum';
import { ExamStatus } from '../enums/exam-status.enum';
import { ExamUser } from '../interfaces/exam-user.interface';

@EntityRepository(Exam)
export class ExamRepository extends BaseRepository<Exam> {
  /**
   * SELECT DISTINCT exam.*
   * FROM exam
   * LEFT JOIN exam_targets_exam_target et
   *  ON exam.id = et.exam_id
   * INNER JOIN exam_target target
   *  on et.exam_target_id = target.id AND target.type IN :targets
   * WHERE
   *  (exam.id NOT IN :ids)
   *  (exam.status = "ACTIVE") AND
   *  (exam.created_at BETWEEN :start AND :end) AND
   *  (exam.deleted_at IS NULL)
   */
  async findByTargets({
    ignoreExams,
    targets,
  }: FindExamByUserDto): Promise<Exam[]> {
    const query = this.createQueryBuilder('exam');

    query
      .distinct(true)
      .leftJoin('exam_targets_exam_target', 'et', 'exam.id = et.exam_id')
      .leftJoin(
        ExamTarget,
        'target',
        'et.exam_target_id = target.id AND target.type IN (:...targets)',
        { targets },
      )
      .where('exam.status = :status', { status: ExamStatus.ACTIVE })
      .andWhere(':date BETWEEN exam.startedAt AND exam.endedAt', {
        date: new Date(),
      });

    if (ignoreExams.length) {
      query.andWhere('exam.id NOT IN (:...ids)', {
        ids: ignoreExams.map((el) => el.id),
      });
    }
    // .andWhere('exam.created_at BETWEEN :start AND :end', {start})

    return this.loadRelations(query).getMany();
  }

  async findByUser(user: ExamUser): Promise<Exam[]> {
    const query = this.createQueryBuilder('exam');

    query
      .innerJoinAndSelect('exam.agreements', 'agreement')
      .where('agreement.userId = :userId', { userId: user.id })
      .andWhere(
        '(agreement.status = :answered OR (agreement.status = :defaultAgreementStatus AND :date BETWEEN exam.startedAt AND exam.endedAt))',
        {
          answered: ExamAgreementStatus.FINISHED,
          defaultAgreementStatus: ExamAgreementStatus.STARTED,
          date: new Date(),
        },
      );

    return this.loadRelations(query).getMany();
  }

  private loadRelations(
    query: SelectQueryBuilder<Exam>,
  ): SelectQueryBuilder<Exam> {
    return query
      .innerJoinAndSelect('exam.period', 'exam_period')
      .leftJoinAndSelect('exam.targets', 'exam_target');
  }
}
