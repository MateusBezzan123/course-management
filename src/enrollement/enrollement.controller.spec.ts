import { Test, TestingModule } from '@nestjs/testing';
import { EnrollementController } from './enrollement.controller';
import { EnrollementService } from './enrollement.service';

describe('EnrollementController', () => {
  let controller: EnrollementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollementController],
      providers: [EnrollementService],
    }).compile();

    controller = module.get<EnrollementController>(EnrollementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
