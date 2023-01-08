import { Module } from '@nestjs/common'
import { CountmapModule } from '../countmap/countmap.module'
import { EventsGateway } from '../events.gateway'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [CountmapModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
