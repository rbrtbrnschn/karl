import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CountmapService } from './countmap.service';

@Controller('countmap')
export class CountmapController {
  constructor(private readonly countmapService: CountmapService) {}

  @ApiResponse({
    status: 200,
    description: 'Returns JSON countmap used in http://localhost:3000',
  })
  @Get()
  getData() {
    const IS_TESTING = true;

    const base = 'https://www.internate.org/';
    const testBases = ['https://animallogic.com', 'https://www.angrybirds.com'];
    const testBase = testBases[0];

    const suffix = '/wp-json/wp/v2/posts';
    const URI = `${IS_TESTING ? testBase : base}${suffix}`;

    return this.countmapService.createFromUrl(URI);
  }
}
