import { FFEntity } from 'src/core/entities/ff.entity';
import { QuestionGroup } from 'src/question-group/entities/question-group.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Question extends FFEntity {
  @Column({ type: 'text' })
  statement: string;

  @Column({ type: 'text' })
  imageUrl: string;

  @Column({ type: 'varchar', default: '' })
  imageAlt: string;

  @Column({ type: 'bool', default: true })
  required: boolean;

  @ManyToOne(() => QuestionGroup)
  group: QuestionGroup;
}
