import { ExamAgreement } from 'src/exam/entities/agreement.entity';
import { Question } from 'src/question-group/entities/question.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { FFEntity } from '../../core/entities/ff.entity';
@Entity('answer')
export class Answer extends FFEntity {
  @Column({ type: 'int', nullable: true })
  score: number;

  @ManyToOne(
    () => ExamAgreement,
    examAgreement => examAgreement.answers
  )
  examAgreement: ExamAgreement;

  @ManyToOne(
    () => Question,
    question => question.answers
  )
  question: Question;
}
