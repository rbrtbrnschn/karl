import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway(8001,{cors:"*"})
export class EventsGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('events')
  handleMessage(client: any, payload: any): string {
    Logger.log("handleMessage")
    return 'Hello my world!';
  }
}
