// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useRef, useState } from 'react';
import styles from './app.module.scss';
import { io, Socket } from 'socket.io-client';
import { IGatewayResponse, parseString } from '@karl/common';
import { Card } from './components/card';
import { Alert } from './components/alert';
import { ToastContainer, toast, Id } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMountEffect } from './hooks/useMountEffect.hook';
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from './interfaces/ws.interface';
import { Table } from './components/table';
import { usePrevious } from './hooks/usePrevious.hook';

export function App() {
  const [state, setState] = useState<IGatewayResponse[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const prevState = usePrevious(state);

  useMountEffect(() => {
    toast.info('Refreshes in 10 seconds...');

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
      `http://localhost:${process.env.WS_PORT || 8001}`
    );
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('init', (e) => {
      setState(e);
      toast.dismiss();
    });
  });

  useEffect(() => {
    const isEqual = state.length === prevState?.length;
    const isDefined = !!prevState;
    if (!isEqual && isDefined) toast.success('New data loaded successfully.');
  }, [state]);

  return (
    <>
      <ToastContainer />

      <div className={'container mx-auto'}>
        <Alert
          title="Using different URL for testing."
          description=" Default URL: https://animallogic.com"
          className="mt-2"
        />
        {state.map((entry) => {
          const header = ['Word', 'Amount'];
          const body = Object.entries(entry.countmap);

          return (
            <div key={entry.id}>
              <Card
                title={entry.slug}
                date={entry.date}
                header={entry?.title?.rendered}
                link={entry.link}
              />
              <Table
                {...{
                  header,
                  body,
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
