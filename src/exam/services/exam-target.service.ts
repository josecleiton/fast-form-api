import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ = require('lodash');

import { ExamTarget } from '../entities/exam-target.entity';
import { ExamTargetType } from '../enums/exam-target-type.enum';
import { ExamTargetRepository } from '../repositories/exam-target.repository';

@Injectable()
export class ExamTargetService {
  private _targetMap?: ReadonlyMap<ExamTargetType, ExamTarget>;

  constructor(
    @InjectRepository(ExamTargetRepository)
    private readonly repository: ExamTargetRepository,
  ) {
    this.loadTargetMap();
  }

  private async loadTargetMap(): Promise<void> {
    const targets = await this.repository.find();

    this._targetMap = new Map<ExamTargetType, ExamTarget>(
      targets.map((target) => [target.type, target]),
    );
  }

  get targetMap(): Promise<ReadonlyMap<ExamTargetType, ExamTarget>> {
    return new Promise((resolve, reject) => {
      if (!this._targetMap) {
        return this.loadTargetMap()
          .then(() => resolve(_.cloneDeep(this._targetMap!)))
          .catch((e) => reject(e));
      }

      resolve(_.cloneDeep(this._targetMap));
    });
  }

  async getTargets(): Promise<ExamTargetType[]> {
    const map = await this.targetMap;

    return Array.from(map.values()).map((target) => target.type);
  }
}
