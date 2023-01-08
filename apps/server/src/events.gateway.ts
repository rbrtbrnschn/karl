import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {CountmapService} from "./countmap/countmap.service";

@WebSocketGateway(8001,{cors:"*"})
export class EventsGateway {
  constructor(private readonly countmapService: CountmapService){}
  @WebSocketServer()
  server;

  @SubscribeMessage('events')
  handleMessage(client: any, payload: any) {
    Logger.log("handleMessage");
    const IS_TESTING = true;

    const base = "https://www.internate.org/";
    const testBases = ["https://animallogic.com","https://www.angrybirds.com"];
    const testBase = testBases[0];

    const suffix = "/wp-json/wp/v2/posts";
    const URI = `${IS_TESTING ? testBase : base}${suffix}`;


    return this.countmapService.createFromUrl(URI) 
  }
}
