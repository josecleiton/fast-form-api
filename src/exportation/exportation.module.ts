import { Module } from '@nestjs/common';
import { ExportationController } from './exportation.controller';
import { ExportationRepository } from './exportation.repository';
import { ExportationService } from './exportation.service';

@Module({
  providers: [
    ExportationService, 
    ExportationRepository,
  ],
  exports: [ExportationService],
  controllers: [ExportationController],
})
export class ExportationModule {}