import { FFEntity } from 'src/core/entities/ff.entity';
import { Exam } from 'src/exam/entities/exam.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Question } from '../question/entities/question.entity';

@Entity()
export class QuestionGroup extends FFEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'bool', default: false })
  class: boolean;

  @Column({type: 'bool', default: false})
  personal: boolean;

  @OneToMany(() => Question, (question) => question.group)
  questions: Question[];

  @ManyToOne(() => Exam)
  exam: Exam;
}
