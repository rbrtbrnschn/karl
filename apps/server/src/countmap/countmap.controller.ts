import { Controller, Get } from '@nestjs/common';
import { CountmapService } from './countmap.service';

@Controller('countmap')
export class CountmapController {
  constructor(private readonly countmapService: CountmapService){}

  @Get()
  getData(){
    const IS_TESTING = true;

    const base = "https://www.internate.org/";
    const testBases = ["https://animallogic.com","https://www.angrybirds.com"];
    const testBase = testBases[0];

    const suffix = "/wp-json/wp/v2/posts";
    const URI = `${IS_TESTING ? testBase : base}${suffix}`;

    return this.countmapService.createFromUrl(URI)
  }
}
