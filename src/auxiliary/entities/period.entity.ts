import { FFEntity } from 'src/core/entities/ff.entity';
import { Exam } from 'src/exam/entities/exam.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity('period')
@Index('IX_period_started_at_ended_at', ['startedAt', 'endedAt'])
export class Period extends FFEntity {
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'datetime' })
  startedAt!: Date;

  @Column({ type: 'datetime' })
  endedAt!: Date;

  @OneToMany(() => Exam, (exam) => exam.period)
  exams!: Exam[];
}
