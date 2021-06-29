import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { Answer } from '../../../answer/entities/answer.entity';
import { Exam } from '../../../exam/entities/exam.entity';
import { ExamAgreement } from '../../../exam/entities/exam-agreement.entity';
import { User } from '../../../user/entities/user.entity';
import { CaslAction as Action } from '../enums/casl-action.enum';
import { QuestionGroup } from 'src/question-group/entities/question-group.entity';
import { UserRole } from 'src/user/enum/user-role.enum';

type CaslSubjects =
  | InferSubjects<
      | typeof Exam
      | typeof ExamAgreement
      | typeof User
      | typeof Answer
      | typeof QuestionGroup
    >
  | 'all';

type AppAbility = Ability<[Action, CaslSubjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    switch (user.role) {
      case UserRole.ADMIN:
        can(Action.MANAGE, 'all');
        break;
      case UserRole.MANAGER:
        can(Action.READ, 'all');
        can(Action.MANAGE, QuestionGroup);
        break;
      default:
        can(Action.READ, User);
        can(Action.READ, ExamAgreement, { userId: user.id });
    }

    // User
    can(Action.UPDATE, User, { id: user.id });

    can(Action.MANAGE, Answer, {});

    // ExamAgreement
    cannot(Action.DELETE, ExamAgreement, { uniqueCode: undefined });

    const examAgreementNotFinished = {
      userId: user.id,
      uuid: undefined,
    };

    can(Action.MANAGE, ExamAgreement, examAgreementNotFinished);

    // Answer
    can(Action.MANAGE, Answer, {
      examAgreement: examAgreementNotFinished,
    });

    // Answer Grade

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<CaslSubjects>,
    });
  }
}
