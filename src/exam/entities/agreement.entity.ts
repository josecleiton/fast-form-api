import { FFEntity } from 'src/core/entities/ff.entity';
import { Column, Entity } from 'typeorm';

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
}
