import { FFEntity } from "src/core/entities/ff.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { ProfessorGrade } from "./professor-grade.entity";

@Entity('professor')
export class Professor extends FFEntity {

  @OneToOne(() => User)
  @JoinColumn()
  user: User 
  
  @OneToMany(
    () => ProfessorGrade,
    professorGrade => professorGrade.grade
  )
  professorGrades: ProfessorGrade[]

}