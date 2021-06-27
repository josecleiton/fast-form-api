import { ChildEntity, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Grade } from './grade.entity';

@ChildEntity()
export class Student extends User {
  @ManyToMany(() => Grade, { lazy: true })
  studentGrades!: Promise<Grade[]>;

  get grades(): Promise<Grade[]> {
    return this.studentGrades;
  }
}
