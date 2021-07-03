import { Grade } from 'src/auxiliary/entities/grade.entity';
import { ChildEntity, Column, ManyToOne } from 'typeorm';
import { Answer } from './answer.entity';

@ChildEntity()
export class AnswerGrade extends Answer {
  @ManyToOne(() => Grade)
  grade!: Grade;

  @Column({ type: 'int' })
  gradeId!: number;
}
