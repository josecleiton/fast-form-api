import { Grade } from 'src/auxiliary/entities/grade.entity';
import { Entity } from 'typeorm';
import { QuestionGroup } from './question-group.entity';

@Entity()
export class QuestionGroupGrade extends QuestionGroup {
  grade: Grade;
}
