import React from 'react';

interface ICardProps extends React.HTMLAttributes<HTMLElement> {
  header: string;
  link: string;
  date: string;
}
export type { ICardProps };
