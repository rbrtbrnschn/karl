import React from 'react'

interface ICardProps extends React.HTMLAttributes<HTMLElement> {
  header:string;
  subHeader:string;
  description:string;
  link:string;
  date:string;
  likes:number;
  comments:number;
}
export type { ICardProps }
