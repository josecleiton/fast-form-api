import { AnswerGrade } from 'src/answer/entities/answer-grade.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

import { FFEntity } from '../../core/entities/ff.entity';
import { Period } from './period.entity';
import { Professor } from './professor.entity';
import { Student } from './student.entity';
import { Subject } from './subject.entity';

@Entity('grade')
export class Grade extends FFEntity {
  @Column({type: 'int'})
  subjectId: number;

  @Column({type: 'int'})
  periodId: number;

  @ManyToOne(() => Subject)
  subject: Subject;

  @ManyToOne(() => Period)
  period: Period;

  @OneToMany(() => AnswerGrade, (answer) => answer.grade)
  answers: AnswerGrade[];

  @ManyToMany('Student')
  students: Student[];

  @ManyToMany('Professor')
  professors: Professor[];
}
