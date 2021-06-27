import { FFEntity } from 'src/core/entities/ff.entity';
import { Exam } from 'src/exam/entities/exam.entity';
import {
  AfterLoad,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
@Index('IX_question_group_class_examId', ['class', 'examId'])
export class QuestionGroup extends FFEntity {
  @Column({ type: 'varchar' })
  title: string;

  // TODO: juntar essas flags em um enum
  @Column({ type: 'bool', default: false })
  class: boolean;

  @Column({ type: 'bool', default: false })
  personal: boolean;

  @Index('IX_question_group_position')
  @Column({ type: 'int', default: 0 })
  position: number;

  @Column({ type: 'int', nullable: true })
  examId: number;

  @OneToMany(() => Question, (question) => question.group)
  questions: Question[];

  @ManyToOne(() => Exam)
  exam: Exam;

  @AfterLoad()
  sortItems() {
    this.questions =
      this.questions?.sort((a, b) => a.position - b.position) ?? [];
  }
}
