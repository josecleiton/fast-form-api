import { Injectable } from '@nestjs/common';
import { ExamTargetType } from '../enums/exam-target-type.enum';
import { ExamTargetNode } from '../models/exam-target-node.model';

interface ExamTargetNodeSchema {
  type: ExamTargetType;
  childs?: ExamTargetNodeSchema[];
}

@Injectable()
export class ExamTargetNodeFactory {
  generate(schema: ExamTargetNodeSchema): ExamTargetNode {
    const node = new ExamTargetNode();
    node.type = schema.type;

    node.childs = schema.childs?.map((node) => this.generate(node)) ?? [];

    return node;
  }
}
