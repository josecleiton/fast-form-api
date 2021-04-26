import { Grade } from 'src/auxiliary/entities/grade.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Answer } from './answer.entity';

@Entity('answer_grade')
export class AnswerGrade extends Answer {
  @Column({ type: 'int' })
  score: number;

  @ManyToOne(
    () => Answer,
    answer => answer
  )
  answer: Answer;

  @ManyToOne(
    () => Grade,
    grade => grade.answerGrades
  )
  grade: Grade;
}
