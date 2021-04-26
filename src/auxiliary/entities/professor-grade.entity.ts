import { FFEntity } from "src/core/entities/ff.entity";
import { Entity, ManyToOne } from "typeorm";
import { Grade } from "./grade.entity";
import { Professor } from "./professor";

@Entity('professor_grade')
export class ProfessorGrade extends FFEntity {

  @ManyToOne(
    () =>  Professor,
    professor => professor.professorGrades
  )
  professor: Professor

  @ManyToOne(
    () =>  Grade,
    grade => grade.professorGrades
  )
  grade: Grade

}