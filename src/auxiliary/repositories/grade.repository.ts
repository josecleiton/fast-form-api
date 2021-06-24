import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Grade } from '../entities/grade.entity';
import { Period } from '../entities/period.entity';
import { Professor } from '../entities/professor.entity';
import { Student } from '../entities/student.entity';
import { UserToFind } from '../types/user-to-find.type';

@EntityRepository(Grade)
export class GradeRepository extends BaseRepository<Grade> {
  findByUserAndPeriod(user: UserToFind, period: Period): Promise<Grade[]> {
    const query = this.createQueryBuilder('grade');

    if (user instanceof Student) {
      query.innerJoin('grade.students', 'user');
    }

    if (user instanceof Professor) {
      query.innerJoin('grade.professors', 'user');
    }

    query
      .innerJoinAndSelect('grade.subject', 'subject')
      .where('grade.periodId = :periodId', { periodId: period.id })
      .andWhere('user.id = :userId', { userId: user.id });

    return query.getMany();
  }
}
