import { Test, TestingModule } from '@nestjs/testing';
import { AuxiliaryController } from './auxiliary.controller';
import { AuxiliaryService } from './auxiliary.service';

describe('AuxiliaryController', () => {
  let controller: AuxiliaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuxiliaryController],
      providers: [AuxiliaryService],
    }).compile();

    controller = module.get<AuxiliaryController>(AuxiliaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
