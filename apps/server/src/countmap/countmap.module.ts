import { Module } from '@nestjs/common'
import { CountmapController } from './countmap.controller'
import { CountmapService } from './countmap.service'

@Module({ providers: [CountmapService], controllers: [CountmapController] })
export class CountmapModule {}
