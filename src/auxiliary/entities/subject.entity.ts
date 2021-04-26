import { FFEntity } from "src/core/entities/ff.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Course } from "./course.entity";
import { Grade } from "./grade.entity";

@Entity('subject')
export class Subject extends FFEntity {

  @Column({ type: 'varchar' })
  code: string

  @Column({ type: 'varchar' })
  title: string

  @ManyToOne(
    () => Course,
    course => course.subjects
  )
  course: Course

  @OneToMany(
    () => Grade,
    grade => grade.period
  )
  grades: Grade[]

}