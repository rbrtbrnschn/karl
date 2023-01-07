// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react'
import styles from './app.module.scss'
import { io, Socket } from "socket.io-client";

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
  const [state, setState] = useState([])
  const [isConnected,setIsConnected] = useState(false);
  useEffect(() => {
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:8001");
    socket.on("connect",()=>{
      setIsConnected(true);
    })
    socket.on("disconnect",()=>{
      setIsConnected(false);
    })
    if(!isConnected) socket.emit("events",(res:any)=>console.log(res));



    /*
    fetch('/api')
      .then((res) => res.json())
      .then((_data) => {
        console.log(_data);
        const { data} = _data;
        setState(data);
      })
      .catch((e) => console.log({ e }))
      */
  }, [])
  return (
    <>
      <table>
        <tr>
          <th>Word</th>
          <th>Amount</th>
        </tr>
      </table>
      {state.map((entry,index)=>{
        const List = Object.entries(entry).map(([word,amount]:any)=>{
          return <tr><td>{word}</td><td>{amount}</td> </tr>;
        })
        return <>{List}<hr/></>

      })}
      
    </>
  )
}

export default App
