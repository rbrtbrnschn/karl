import { Test, TestingModule } from '@nestjs/testing';
import { CountmapService } from './countmap.service';

describe('CountmapService', () => {
  let service: CountmapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountmapService],
    }).compile();

    service = module.get<CountmapService>(CountmapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
