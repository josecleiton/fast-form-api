import { ChildEntity, Column, JoinTable, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Grade } from './grade.entity';

@ChildEntity()
export class Student extends User {
  @ManyToMany(() => Grade)
  @JoinTable({ name: 'student_grade' })
  grades: Promise<Grade[]>;
}
