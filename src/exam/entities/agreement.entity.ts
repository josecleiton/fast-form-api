import { Answer } from 'src/answer/entities/answer.entity';
import { FFEntity } from 'src/core/entities/ff.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Exam } from './exam.entity';

@Entity('exam_agreement')
export class ExamAgreement extends FFEntity {
  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column({ type: 'boolean' })
  anonymous: boolean;

  @Column({ type: 'int' })
  userId: number;

  hasFinishedExam(): boolean {
    return !!this.uuid;
  }

  @ManyToOne(
    () => User,
    user => user
  )
  user: User

  @ManyToOne(
    () => Exam,
    exam => exam.examAgreements
  )
  exam: Exam

  @OneToMany(
    () => Answer,
    answer => answer.examAgreement
  )
  answers: Answer[]
}
