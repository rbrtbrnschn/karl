import { Test, TestingModule } from '@nestjs/testing';
import { CountmapController } from './countmap.controller';

describe('CountmapController', () => {
  let controller: CountmapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountmapController],
    }).compile();

    controller = module.get<CountmapController>(CountmapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
