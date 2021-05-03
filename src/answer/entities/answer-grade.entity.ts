import { Grade } from 'src/auxiliary/entities/grade.entity';
import { ChildEntity, ManyToOne } from 'typeorm';
import { Answer } from './answer.entity';

@ChildEntity()
export class AnswerGrade extends Answer {
  @ManyToOne(() => Grade)
  grade: Grade;
}
