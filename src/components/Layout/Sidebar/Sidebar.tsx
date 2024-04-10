import React, { FC, ReactNode } from 'react'
import style from "./Sidebar.module.css"
interface SidebarProps {
    children: ReactNode; // ReactNode поддерживает элементы, строки, числа, фрагменты и т.д.
}
  
const Sidebar: FC<SidebarProps> = ({children}) => {

    return (
      <div className={style.slider}>
        {children}
      </div>
    )
}

export default Sidebar
