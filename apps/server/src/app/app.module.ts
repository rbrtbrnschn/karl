import { Module } from '@nestjs/common';
import { EventsGateway } from '../events.gateway';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
