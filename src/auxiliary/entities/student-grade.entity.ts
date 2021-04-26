import { FFEntity } from "src/core/entities/ff.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Grade } from "./grade.entity";
import { Student } from "./student.entity";

@Entity('student_grade')
export class StudentGrade  extends FFEntity {

  @ManyToOne(
    () =>  Student,
    student => student
  )
  student: Student

  @ManyToOne(
    () =>  Grade,
    grade => grade.studentGrades
  )
  grade: Grade
}