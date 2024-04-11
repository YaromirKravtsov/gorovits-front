import React, { FC, LegacyRef, ReactNode, useEffect, useRef } from 'react'
import style from "./Sidebar.module.css"
interface SidebarProps {
    children: ReactNode; // ReactNode поддерживает элементы, строки, числа, фрагменты и т.д.
    className:string
    setWidth: (value:number) => void,
    setHeight: (value:number) => void,
}
  
const Sidebar: FC<SidebarProps> = ({children,setWidth,className,setHeight}) => {
    const elRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      if (elRef.current) {
        setWidth(elRef.current.offsetWidth)
        setHeight(elRef.current.offsetHeight)
      }
    }, []);

    return (
      <div className={`${style.slider} ${className}`} ref={elRef}>
        {children}
      </div>
    )
}

export default Sidebar
