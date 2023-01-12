import { IGatewayResponse } from '@karl/common';

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  init: (e: IGatewayResponse[]) => void;
}

export interface ClientToServerEvents {
  events: (res?: any) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
