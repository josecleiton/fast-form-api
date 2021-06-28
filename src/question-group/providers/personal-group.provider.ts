import { InjectRepository } from '@nestjs/typeorm';
import { Professor } from 'src/auxiliary/entities/professor.entity';
import { Student } from 'src/auxiliary/entities/student.entity';
import { GradeService } from 'src/auxiliary/services/grade.service';
import { Exam } from 'src/exam/entities/exam.entity';
import { QuestionGroupGrade } from '../dtos/question-group-grade.dto';
import { QuestionGroup } from '../entities/question-group.entity';
import { questionGroupRelations } from '../question.constants';
import { QuestionGroupRepository } from '../repositories/question-group.repository';

export class PersonalQuestionGroup {
  constructor(
    @InjectRepository(QuestionGroupRepository)
    private readonly repository: QuestionGroupRepository,
    private readonly gradeService: GradeService,
  ) {}

  async getPersonal(
    user: Student | Professor,
    exam: Exam,
  ): Promise<QuestionGroup[]> {
    const grades = await this.gradeService.findByUserAndPeriod(
      user,
      exam.period,
    );
    if (!grades.length) {
      return [];
    }

    const groupGrades = await this.repository.find({
      where: { class: true, exam },
      relations: questionGroupRelations,
    });

    return groupGrades
      .reduce(
        (result, group) => [
          ...result,
          ...grades.map((grade) => {
            const groupGrade = Object.assign(new QuestionGroupGrade(), group);
            groupGrade.grade = grade;
            return groupGrade;
          }),
        ],
        new Array<QuestionGroup>(),
      )
      .sort((a, b) => a.id - b.id);
  }
}
