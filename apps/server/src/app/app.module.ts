import { Module } from '@nestjs/common'
import { CountmapModule } from '../countmap/countmap.module'
import { CountmapService } from '../countmap/countmap.service'
import { EventsGateway } from '../events.gateway'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [CountmapModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway, CountmapService],
})
export class AppModule {}
