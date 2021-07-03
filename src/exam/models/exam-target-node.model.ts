import { ExamTargetType } from '../enums/exam-target-type.enum';

type Path = ExamTargetNode[] | undefined;

export class ExamTargetNode {
  constructor(
    readonly type: ExamTargetType,
    readonly childs: ExamTargetNode[],
  ) {}

  get isLeaf(): boolean {
    return !this.childs.length;
  }

  dfs(type: string): Path {
    if (this.type === type) {
      return [this];
    }
    if (this.isLeaf) return;
    for (const node of this.childs) {
      const partialPath = node.dfs(type);
      if (partialPath) {
        return [this, ...partialPath];
      }
    }
  }
}
