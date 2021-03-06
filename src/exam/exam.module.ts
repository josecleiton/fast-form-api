import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExamService } from './services/exam.service';
import { ExamController } from './controllers/exam.controller';
import { ExamRepository } from './repositories/exam.repository';
import { ExamTargetRepository } from './repositories/exam-target.repository';
import { ExamTargetService } from './services/exam-target.service';
import { ExamTargetController } from './controllers/exam-target.controller';
import { ExamAgreementService } from './services/exam-agreement.service';
import { ExamAgreementRepository } from './repositories/exam-agreement.repository';
import { ExamAgreementController } from './controllers/exam-agreement.controller';
import { ExamTargetTree } from './providers/exam-target-tree.provider';
import { ExamTargetNodeFactory } from './factories/exam-target-node.factory';
import { AuxiliaryModule } from 'src/auxiliary/auxiliary.module';
import { InfraModule } from 'src/infra/infra.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExamRepository,
      ExamTargetRepository,
      ExamAgreementRepository,
    ]),
    AuxiliaryModule,
    InfraModule,
  ],
  controllers: [ExamController, ExamTargetController, ExamAgreementController],
  providers: [
    ExamService,
    ExamTargetService,
    ExamAgreementService,
    ExamTargetTree,
    ExamTargetNodeFactory,
  ],
  exports: [ExamService, ExamAgreementService],
})
export class ExamModule {}
