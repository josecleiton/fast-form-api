import { Answer } from "src/answer/entities/answer.entity";
import { FFEntity } from "src/core/entities/ff.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ExamQuestionGroup } from "./exam-question-group.entity";

@Entity('question')
export class Question extends FFEntity {
  @Column({
    nullable: false,
    type: 'longtext',
  })
  statement: string
  
  @Column({ type: 'varchar' })
  imageUrl: string
  
  @Column({ type: 'varchar' })
  imageAlt: string

  @Column({ type: 'bool' })
  required: boolean

  @ManyToOne(
    () => ExamQuestionGroup,
    examQuestionGroup => examQuestionGroup.questions
  )
  examQuestionGroup: ExamQuestionGroup

  @OneToMany(
    () => Answer,
    answer => answer.question
  )
  answers: Answer[]
}