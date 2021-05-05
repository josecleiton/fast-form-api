import { FFEntity } from 'src/core/entities/ff.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Question } from '../question/entities/question.entity';

@Entity()
export class QuestionGroup extends FFEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'bool' })
  class: boolean;

  @OneToMany(() => Question, (question) => question.group)
  questions: Question[];
}
