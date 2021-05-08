import { Period } from 'src/auxiliary/entities/period.entity';
import { QuestionGroup } from 'src/question-group/entities/question-group.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { FFEntity } from '../../core/entities/ff.entity';
import { ExamStatus } from '../enums/exam-status.enum';

@Entity('exam')
export class Exam extends FFEntity {
  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'datetime' })
  startedAt: Date;

  @Column({ type: 'datetime' })
  endedAt: Date;

  @Column({ type: 'bool', default: false })
  allowAnonymous: boolean;

  @Column({ type: 'enum', enum: ExamStatus })
  status: ExamStatus;

  @ManyToOne(() => Period)
  period: Period;

  @OneToMany(() => QuestionGroup, (group) => group.exam)
  groups: QuestionGroup[];
}
