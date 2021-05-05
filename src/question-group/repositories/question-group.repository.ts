import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { QuestionGroup } from "../entities/question-group.entity";

@EntityRepository(QuestionGroup)
export class QuestionGroupRepository extends BaseRepository<QuestionGroup> {}