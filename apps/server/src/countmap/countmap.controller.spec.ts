import { Test, TestingModule } from '@nestjs/testing';
import { CountmapController } from './countmap.controller';
import { CountmapService } from './countmap.service';

describe('CountmapController', () => {
  let controller: CountmapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountmapController],
      providers: [CountmapService]
    }).compile();

    controller = module.get<CountmapController>(CountmapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
