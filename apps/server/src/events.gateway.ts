import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { CountmapService } from './countmap/countmap.service';

@WebSocketGateway(parseInt(process.env.WS_PORT) || 8001, { cors: '*' })
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly countmapService: CountmapService) {}
  @WebSocketServer() server;

  private connections: any[] = [];

  async handleEmit(url: string) {
    const data = await this.countmapService.createFromUrl(url);

    this.server.emit('init', data);
    Logger.log('Broadcasted data.');
    return data;
  }

  afterInit(server: any) {
    const IS_TESTING = true;

    const base = 'https://www.internate.org/';
    const testBases = ['https://animallogic.com', 'https://www.angrybirds.com'];
    const testBase = testBases[0];

    const suffix = '/wp-json/wp/v2/posts';
    const URI = `${IS_TESTING ? testBase : base}${suffix}`;

    setInterval(() => {
      this.handleEmit(URI);
    }, 10000);
  }

  handleConnection(client: any) {
    this.connections.push(client);
  }
  handleDisconnect(client: any) {
    //@ICEBOX error handling - duplicates, missing conns
    const connectionIndex = this.connections.findIndex(
      (con) => con.id === client.id
    );
    this.connections.splice(connectionIndex, 1);
  }

  //@ICEBOX Admin panel - changes url, which is fetched and sent out periodically.
  // @SubscribeMessage('set-url')
  // handleSetUrl(client: any, payload: any) {
  // }
}
