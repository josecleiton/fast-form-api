import { Period } from 'src/auxiliary/entities/period.entity';
import { QuestionGroup } from 'src/question-group/entities/question-group.entity';
import {
  AfterLoad,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { FFEntity } from '../../core/entities/ff.entity';
import { ExamStatus } from '../enums/exam-status.enum';
import { ExamAgreement } from './exam-agreement.entity';
import { ExamTarget } from './exam-target.entity';

@Entity('exam')
export class Exam extends FFEntity {
  @Column({ type: 'text' })
  title: string;

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

  @Column({ type: 'int', nullable: true })
  periodId: number;

  @ManyToMany(() => ExamTarget)
  @JoinTable()
  targets?: ExamTarget[];

  @ManyToOne(() => Period)
  period: Period;

  @OneToMany(() => QuestionGroup, (group) => group.exam)
  groups: QuestionGroup[];

  @OneToMany(() => ExamAgreement, (agreement) => agreement.exam)
  agreements: ExamAgreement[];

  @AfterLoad()
  sortItems() {
    this.groups = this.groups?.sort((a, b) => a.position - b.position) ?? [];
  }
}
