import { Test, TestingModule } from '@nestjs/testing';
import { AuxiliaryService } from './auxiliary.service';

describe('AuxiliaryService', () => {
  let service: AuxiliaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuxiliaryService],
    }).compile();

    service = module.get<AuxiliaryService>(AuxiliaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
