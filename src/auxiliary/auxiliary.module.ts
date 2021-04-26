import { Module } from '@nestjs/common';
import { AuxiliaryService } from './auxiliary.service';
import { AuxiliaryController } from './auxiliary.controller';

@Module({
  controllers: [AuxiliaryController],
  providers: [AuxiliaryService]
})
export class AuxiliaryModule {}
