// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react'
import styles from './app.module.scss'
import { io, Socket } from 'socket.io-client'
import { IGatewayResponse, parseString } from '@karl/common'
import { Card } from './components/card/card'

interface ServerToClientEvents {
  noArg: () => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

interface ClientToServerEvents {
  events: (res?: any) => void
}

interface InterServerEvents {
  ping: () => void
}

interface SocketData {
  name: string
  age: number
}

export function App() {
  const [state, setState] = useState<IGatewayResponse[]>([])
  const [isConnected, setIsConnected] = useState(false)
  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `http://localhost:${process.env.WS_PORT || 8001}`
    )
    socket.on('connect', () => {
      setIsConnected(true)
    })
    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    //@TODO fix typing
    //@ts-ignore
    socket.on('init', (e) => {
      setState(e)
      console.log('basic emit', e)
    })
  }, [])
  return (
    <>
      <div className={'container mx-auto'}>
        {state.map((entry, index) => {
          const List = Object.entries(entry.countmap).map(
            ([word, amount]: any) => {
              return (
                <tr
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                  key={word + amount}
                >
                  <td
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {word}
                  </td>
                  <td scope='row' className='px-6 py-4'>
                    {amount}
                  </td>
                </tr>
              )
            }
          )
          return (
            <div key={entry.id}>
              <Card
                title={entry.slug}
                date={entry.date}
                header={entry.slug}
                subHeader={entry?.title?.rendered}
                description={
                  parseString(entry?.content?.rendered).slice(0, 500) + '...'
                }
                link={entry.link}
                likes={1}
                comments={4}
              />
              <div className='relative overflow-x-auto'>
                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th scope='col' className='px-6 py-3'>
                        Word
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>{List}</tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
