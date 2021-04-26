import { AnswerGrade } from "src/answer/entities/answer-grade.entity";
import { FFEntity } from "src/core/entities/ff.entity";
import { Entity, ManyToOne, OneToMany } from "typeorm";
import { Period } from "./period.entity";
import { ProfessorGrade } from "./professor-grade.entity";
import { StudentGrade } from "./student-grade.entity";
import { Subject } from "./subject.entity";

@Entity('grade')
export class Grade extends FFEntity {
  @ManyToOne(
    () => Subject,
    subject => subject.grades
  )
  subject: Subject

  @ManyToOne(
    () => Period,
    period => period.grades
  )
  period: Period

  @OneToMany(
    () => StudentGrade,
    studentGrade => studentGrade.grade
  )
  studentGrades: StudentGrade[]

  @OneToMany(
    () => ProfessorGrade,
    professorGrade => professorGrade.grade
  )
  professorGrades: ProfessorGrade[]

  @OneToMany(
    () => AnswerGrade,
    answerGrade => answerGrade.grade
  )
  answerGrades: AnswerGrade[]
}