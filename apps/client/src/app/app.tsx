// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from 'react';
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

export function App() {
  useEffect(()=>{
    console.log("Started up")
    fetch("https://www.internate.org/toechter-und-soehne-blog/wp/v2/posts",{mode: 'cors'})
      .then((res)=>res.json())
      .then(console.log);
  },[])
  return (
    <>
      <NxWelcome title="client" />
      <div />
    </>
  );
}

export default App;
