import { FFEntity } from 'src/core/entities/ff.entity';
import { Column, Entity } from 'typeorm';
import { ExamTargetType } from '../enums/exam-target-type.enum';

@Entity('exam_target')
export class ExamTarget extends FFEntity {
  @Column({ type: 'enum', enum: ExamTargetType, unique: true })
  type: ExamTargetType;
}
