import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExportationController } from './exportation.controller';
import { ExportationRepository } from './exportation.repository';
import { ExportationService } from './exportation.service';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [ExportationService, ExportationRepository],
  exports: [ExportationService],
  controllers: [ExportationController],
})
export class ExportationModule {}
