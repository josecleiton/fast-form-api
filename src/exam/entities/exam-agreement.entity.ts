import { FFEntity } from '../../core/entities/ff.entity';
import { Column, Entity, Generated, ManyToMany, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Exam } from './exam.entity';
import { Grade } from 'src/auxiliary/entities/grade.entity';
import { ExamAgreementStatus } from '../enums/exam-agreement-status.enum';

@Entity('exam_agreement')
export class ExamAgreement extends FFEntity {
  @Generated('uuid')
  @Column({ unique: true })
  uuid: string;

  @Column({ type: 'boolean', default: false })
  anonymous: boolean;

  @Column({ type: 'text', nullable: true })
  observation?: string;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  examId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Exam)
  exam: Exam;

  @ManyToMany(() => Grade)
  grades: Grade[];

  @Column({
    type: 'enum',
    enum: ExamAgreementStatus,
    default: ExamAgreementStatus.STARTED,
  })
  status: ExamAgreementStatus;

  hasFinishedExam(): boolean {
    return this.status === ExamAgreementStatus.FINISHED;
  }
}
