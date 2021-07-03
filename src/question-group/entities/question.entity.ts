import { Answer } from 'src/answer/entities/answer.entity';
import { FFEntity } from 'src/core/entities/ff.entity';
import { QuestionGroup } from 'src/question-group/entities/question-group.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Question extends FFEntity {
  @Column({ type: 'text' })
  statement!: string;

  @Column({ type: 'text', nullable: true })
  imageUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  imageAlt?: string;

  @Column({ type: 'bool', default: true })
  required!: boolean;

  @Column({ type: 'int' })
  groupId!: number;

  @Index('IX_question_position')
  @Column({ type: 'int', default: 0 })
  position!: number;

  @ManyToOne(() => QuestionGroup)
  group!: QuestionGroup;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers!: Answer[];
}
