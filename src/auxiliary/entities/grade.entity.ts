import { AnswerGrade } from 'src/answer/entities/answer-grade.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

import { FFEntity } from '../../core/entities/ff.entity';
import { Period } from './period.entity';
import { Subject } from './subject.entity';

@Entity('grade')
export class Grade extends FFEntity {
  @ManyToOne(() => Subject)
  subject: Subject;

  @ManyToOne(() => Period)
  period: Period;

  @OneToMany(() => AnswerGrade, (answer) => answer.grade)
  answers: AnswerGrade[];
}
