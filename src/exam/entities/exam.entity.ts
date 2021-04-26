import { Period } from 'src/auxiliary/entities/period.entity';
import { ExamQuestionGroup } from 'src/question-group/entities/exam-question-group.entity';
import { Column, Entity, ManyToOne, OneToMany,  } from 'typeorm';
import { FFEntity } from '../../core/entities/ff.entity';
import { ExamAgreement } from './agreement.entity';

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
@Entity('exam')
export class Exam extends FFEntity {
  
  @Column({ type: 'varchar'})
  title: string

  @Column({
    nullable: false,
    type: 'longtext',
  })
  description: string

  @Column({ type: 'datetime'})
  startedAt: Date

  @Column({ type: 'datetime'})
  endedAt: Date

  @Column({ type: 'bool' })
  allowAnonymous: boolean

  @Column({ type: 'enum' })
  status: StatusEnum

  @Column({ type: 'varchar'})
  url: string

  @OneToMany(type => ExamQuestionGroup, questionGroup => questionGroup.exam)
  examQuestionsGroups: ExamQuestionGroup[]

  @ManyToOne(
    () => Period,
    period => period.exams
  )
  period: Period

  @OneToMany(
    () => ExamAgreement,
    examAgreement => examAgreement.exam
  )
  examAgreements: ExamAgreement[]
  
}
