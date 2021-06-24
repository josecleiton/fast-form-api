import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { FindExamByUserDto } from '../dtos/find-exam-by-user.dto';
import { ExamTarget } from '../entities/exam-target.entity';
import { Exam } from '../entities/exam.entity';
import { ExamStatus } from '../enums/exam-status.enum';

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
  async findByUser({
    ignoreExams,
    targets,
    user,
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
      .where('exam.status = :status', { status: ExamStatus.ACTIVE });

    if (ignoreExams.length) {
      query.andWhere('exam.id NOT IN (:...ids)', {
        ids: ignoreExams.map((el) => el.id),
      });
    }
    // .andWhere('exam.created_at BETWEEN :start AND :end', {start})

    return query.getMany();
  }
}
