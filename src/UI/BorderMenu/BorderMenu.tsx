import  { FC, ReactNode } from 'react';
import style from './BorderMenu.module.css';
interface Props{
    children: ReactNode;
    className: string;
}
const BorderMenu:FC<Props> = (props) => {
  return (
    <div className={`${style.borderMenu} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default BorderMenu
