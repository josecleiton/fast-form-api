import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfraModule } from 'src/infra/infra.module';
import { ExportationController } from './exportation.controller';
import { ExportationRepository } from './exportation.repository';
import { ExportationService } from './exportation.service';

@Module({
  imports: [TypeOrmModule.forFeature(), InfraModule],
  providers: [ExportationService, ExportationRepository],
  exports: [ExportationService],
  controllers: [ExportationController],
})
export class ExportationModule {}
