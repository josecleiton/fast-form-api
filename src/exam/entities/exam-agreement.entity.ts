import { FFEntity } from '../../core/entities/ff.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Exam } from './exam.entity';
import { ExamAgreementStatus } from '../enums/exam-agreement-status.enum';
import { Expose } from 'class-transformer';

@Entity('exam_agreement')
export class ExamAgreement extends FFEntity {
  @Column({ unique: true, length: 36 })
  uniqueCode: string;

  @Column({ type: 'datetime', nullable: true })
  uniqueCodeSendedAt?: Date;

  @Column({ type: 'boolean', default: false })
  anonymous: boolean;

  @Column({ type: 'text', nullable: true })
  observation?: string;

  @Column({
    type: 'enum',
    enum: ExamAgreementStatus,
    default: ExamAgreementStatus.STARTED,
  })
  status: ExamAgreementStatus;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  examId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Exam)
  exam: Exam;

  @Expose()
  hasFinishedExam(): boolean {
    return this.status === ExamAgreementStatus.FINISHED;
  }
}
