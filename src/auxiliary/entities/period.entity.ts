import { FFEntity } from "src/core/entities/ff.entity";
import { Exam } from "src/exam/entities/exam.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Grade } from "./grade.entity";

@Entity('period')
export class Period extends FFEntity {

  @Column({ type: 'varchar', nullable: true })
  name: string

  @Column({ type: 'datetime'})
  startedAt: Date

  @Column({ type: 'datetime'})
  endedAt: Date

  @OneToMany(
    () => Grade,
    grade => grade.period
  )
  grades: Grade[]

  @OneToMany(
    () => Exam,
    exam => exam.period
  )
  exams: Exam[]

} 