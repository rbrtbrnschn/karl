import type { HTMLAttributes } from 'react';

interface IAlertProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export type { IAlertProps };
