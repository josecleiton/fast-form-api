import { ExamAgreement } from 'src/exam/entities/exam-agreement.entity';
import { Question } from 'src/question-group/entities/question.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  TableInheritance,
} from 'typeorm';
import { FFEntity } from '../../core/entities/ff.entity';
import { AnswerType } from '../enums/answer-type.enum';

@Entity('answer')
@TableInheritance({ column: { type: 'enum', name: 'type', enum: AnswerType } })
export class Answer extends FFEntity {
  @Column({ type: 'int', nullable: true })
  score?: number;

  @Column({ type: 'enum', enum: AnswerType })
  type: AnswerType;

  @Column({ type: 'int' })
  examAgreementId: number;

  @Column({ type: 'int' })
  questionId: number;

  @ManyToOne(() => ExamAgreement)
  examAgreement: ExamAgreement;

  @ManyToOne(() => Question)
  question: Question;
}
