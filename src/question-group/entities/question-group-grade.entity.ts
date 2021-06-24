import { Grade } from 'src/auxiliary/entities/grade.entity';
import { QuestionGroup } from './question-group.entity';

export class QuestionGroupGrade extends QuestionGroup {
  grade: Grade;
}
