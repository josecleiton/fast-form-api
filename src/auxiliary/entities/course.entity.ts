import { Column, Entity, OneToMany } from 'typeorm';
import { FFEntity } from '../../core/entities/ff.entity';
import { Subject } from './subject.entity';

@Entity('course')
export class Course extends FFEntity {
  @Column({ type: 'varchar', unique: true })
  code: string;

  @Column({ type: 'varchar' })
  title: string;

  @OneToMany(() => Subject, (subject) => subject.course)
  subjects: Subject[];
}
