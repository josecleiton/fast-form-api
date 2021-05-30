import { Injectable, NotFoundException } from '@nestjs/common';
import { Exam } from '../entities/exam.entity';
import { ExamTargetType } from '../enums/exam-target-type.enum';
import { ExamTargetNodeFactory } from '../factories/exam-target-node.factory';
import { ExamTargetNode } from '../models/exam-target-node.model';

@Injectable()
export class ExamTargetTree {
  private readonly root: ExamTargetNode;

  constructor(targetNodeFactory: ExamTargetNodeFactory) {
    this.root = targetNodeFactory.generate({
      type: ExamTargetType.COURSE,
      childs: [
        {
          type: ExamTargetType.GRADE,
          childs: [
            { type: ExamTargetType.PROFESSOR },
            { type: ExamTargetType.STUDENT },
          ],
        },
      ],
    });
  }

  queryTarget(target: string): ExamTargetNode[] {
    const path = this.root.dfs(target);

    if (!path) {
      throw new NotFoundException(this.root, target);
    }

    return path;
  }
}
