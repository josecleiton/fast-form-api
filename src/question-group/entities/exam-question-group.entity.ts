import { FFEntity } from "src/core/entities/ff.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exam } from '../../exam/entities/exam.entity'
import { QuestionGroup } from "./question-group.entity";
import { Question } from "./question.entity";

@Entity('exam_question_group')
export class ExamQuestionGroup extends FFEntity {
  
  @Column({ type: 'integer' })
  position: number;

  @ManyToOne(
    () => QuestionGroup,
    questionGroup => questionGroup.examQuestionGroups
  )
  questionGroup: QuestionGroup

  @ManyToOne(
    () => Exam,
    exam => exam.examQuestionsGroups
  )
  exam: Exam

  @OneToMany(
    () => Question,
    question => question.examQuestionGroup
  )
  questions: Question[]
}
