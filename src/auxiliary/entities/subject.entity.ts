import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { FFEntity } from '../../core/entities/ff.entity';
import { Course } from './course.entity';
import { Grade } from './grade.entity';

@Entity('subject')
export class Subject extends FFEntity {
  @Column({ type: 'varchar', unique: true })
  code!: string;

  @Column({ type: 'varchar' })
  title!: string;

  @Column({ type: 'int' })
  courseId!: number;

  @ManyToOne(() => Course)
  course!: Course;

  @OneToMany(() => Grade, (grade) => grade.subject)
  grades!: Grade[];
}
