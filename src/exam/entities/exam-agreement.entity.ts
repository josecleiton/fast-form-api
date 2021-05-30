import { FFEntity } from '../../core/entities/ff.entity';
import {
  Column,
  Entity,
  Generated,
  JoinTable,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Exam } from './exam.entity';

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

  hasFinishedExam(): boolean {
    return !!this.uuid;
  }
}
