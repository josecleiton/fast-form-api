import { FFEntity } from 'src/core/entities/ff.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Grade } from './grade.entity';

@Entity('period')
export class Period extends FFEntity {
  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @Column({ type: 'datetime' })
  statedAt: Date;

  @Column({ type: 'datetime' })
  endedAt: Date;

  @OneToMany(() => Grade, (grade) => grade.period)
  grades: Grade[];
}
