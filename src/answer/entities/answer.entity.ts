import { ExamAgreement } from 'src/exam/entities/agreement.entity';
import { Column, ManyToOne, OneToMany } from 'typeorm';
import { FFEntity } from '../../core/entities/ff.entity';

export class Answer extends FFEntity {
  @Column({ type: 'int', nullable: true })
  score: number;

  @ManyToOne(() => ExamAgreement)
  examAgreement: ExamAgreement;
}
