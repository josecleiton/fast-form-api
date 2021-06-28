import { Grade } from 'src/auxiliary/entities/grade.entity';
import { QuestionGroup } from '../entities/question-group.entity';

export class QuestionGroupGrade extends QuestionGroup {
  grade: Grade;
}
