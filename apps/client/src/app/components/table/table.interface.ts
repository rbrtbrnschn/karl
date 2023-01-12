import { HTMLAttributes } from 'react';

export interface ITableProps extends HTMLAttributes<HTMLTableElement> {
  header: string[];
  body: (string | number)[][];
}
