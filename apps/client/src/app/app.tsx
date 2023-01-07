// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react'
import styles from './app.module.scss'

export function App() {
  const [state, setState] = useState([])
  useEffect(() => {
    console.log('Started up')
    fetch('/api')
      .then((res) => res.json())
      .then((_data) => {
        console.log(_data);
        const { data} = _data;
        setState(data);
      })
      .catch((e) => console.log({ e }))
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
