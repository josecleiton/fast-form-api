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
  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column({ type: 'boolean' })
  anonymous: boolean;

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
