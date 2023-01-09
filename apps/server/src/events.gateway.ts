import { Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { CountmapService } from './countmap/countmap.service'

@WebSocketGateway(8001, { cors: '*' })
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private readonly countmapService: CountmapService) {}
  @WebSocketServer() server

  //@TODO find type
  private connections: any[] = []

  afterInit(server: any) {
    setInterval(async () => {
      const IS_TESTING = true

      const base = 'https://www.internate.org/'
      const testBases = [
        'https://animallogic.com',
        'https://www.angrybirds.com',
      ]
      const testBase = testBases[1]

      const suffix = '/wp-json/wp/v2/posts'
      const URI = `${IS_TESTING ? testBase : base}${suffix}`

      const data = await this.countmapService.createFromUrl(URI)

      this.server.emit('init', data)
      Logger.log("Broadcasting data.")
    }, 10000)
  }

  handleConnection(client: any, ...args: any[]) {
    this.connections.push(client)
  }
  handleDisconnect(client: any) {
    //@TODO error handling - duplicates, missing
    const connectionIndex = this.connections.findIndex(
      (con) => con.id === client.id
    )
    this.connections.splice(connectionIndex, 1)
  }

  @SubscribeMessage('set-url')
  handleSetUrl(client: any, payload: any) {
    //@TODO Admin panel - changes url, which is fetched and sent out periodically.
  }
}
