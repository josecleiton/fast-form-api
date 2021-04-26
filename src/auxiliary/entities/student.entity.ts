import { FFEntity } from "src/core/entities/ff.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { StudentGrade } from "./student-grade.entity";

@Entity('student')
export class Student extends FFEntity {

  @OneToOne(() => User)
  @JoinColumn()
  user: User 

  @OneToMany(
    () => StudentGrade,
    studentGrade => studentGrade.student
  )
  studentGrades: StudentGrade[]

}