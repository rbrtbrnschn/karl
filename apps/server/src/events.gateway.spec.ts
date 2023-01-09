import { Test, TestingModule } from '@nestjs/testing'
import { CountmapService } from './countmap/countmap.service'
import { EventsGateway } from './events.gateway'
import fetch from 'node-fetch'

describe('EventsGateway', () => {
  let gateway: EventsGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsGateway, CountmapService],
    }).compile()

    gateway = module.get<EventsGateway>(EventsGateway)
    gateway.server = { emit: jest.fn(() => null) }
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })

  it('dunno', async () => {
    const MOCK_RESPONSE = [
      {
        id: 1,
        content: {
          rendered:
            '\n' +
            '<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>\n',
        },
      },
    ]
    const MOCK_COUNTMAPS = [{
      welcome: 1,
      to: 1,
      wordpress: 1,
      this: 1,
      is: 1,
      your: 1,
      first: 1,
      post: 1,
      edit: 1,
      or: 1,
      delete: 1,
      it: 1,
      then: 1,
      start: 1,
      writing: 1,
    }]
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(MOCK_RESPONSE),
      })
    ) as any
    const returnValue = await gateway.handleEmit(
      'https://www.angrybirds.com/wp-json/wp/v2/posts'
    )
    expect(returnValue).toEqual(MOCK_COUNTMAPS)
  })
})
