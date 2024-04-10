import React, { FC, ReactNode } from 'react';
import style from './SiderBottomMenu.module.css'
interface SiderBottomMenuProps{

     firstComponent: ReactNode;
     secondComponent: ReactNode;
}
const SiderBottomMenu: FC<SiderBottomMenuProps> = (props) => {
  return (
    <div className={style.menu}>
        {props.firstComponent}
        <div className={style.line}></div>
        {props.secondComponent}
    </div>
  )
}

export default SiderBottomMenu
