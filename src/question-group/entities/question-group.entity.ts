import { FFEntity } from "src/core/entities/ff.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExamQuestionGroup } from "./exam-question-group.entity";

@Entity('question_group')
export class QuestionGroup extends FFEntity {

  @Column({ type: 'varchar' })
  title: string

  @Column({ type: 'bool' })
  class: boolean

  @OneToMany(
    () => ExamQuestionGroup, 
    examQuestionGroup => examQuestionGroup.questionGroup
  )
  examQuestionGroups: ExamQuestionGroup[]
}
