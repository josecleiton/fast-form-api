import { FFEntity } from "src/core/entities/ff.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Subject } from "./subject.entity";

@Entity('course')
export class Course extends FFEntity {

  @Column({ type: 'varchar' })
  code: string

  @Column({ type: 'varchar' })
  title: string

  @OneToMany(
    () => Subject,
    subject => subject.course
  )
  subjects: Subject[]
}
 