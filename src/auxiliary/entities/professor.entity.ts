import { ChildEntity, ManyToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Grade } from './grade.entity';

@ChildEntity()
export class Professor extends User {
  @ManyToMany(() => Grade, { lazy: true })
  professorGrades!: Promise<Grade[]>;

  get grades(): Promise<Grade[]> {
    return this.professorGrades;
  }
}
