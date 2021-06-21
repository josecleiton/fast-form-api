import { ChildEntity, JoinTable, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Grade } from './grade.entity';

@ChildEntity()
export class Professor extends User {
  @ManyToMany(() => Grade)
  @JoinTable({ name: 'professor_grade' })
  grades: Promise<Grade[]>;
}
