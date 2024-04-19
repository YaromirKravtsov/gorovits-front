import React, { FC, LegacyRef, ReactNode, useEffect, useRef } from 'react'
import style from "./Sidebar.module.css"
import { useTypedSelector } from '../../../hooks/useTypedSelector';

interface SidebarProps {
    children: ReactNode; // ReactNode поддерживает элементы, строки, числа, фрагменты и т.д.
    className:string
    setWidth: (value:number) => void,
    setHeight: (value:number) => void,
}
  
const Sidebar: FC<SidebarProps> = ({children,setWidth,className,setHeight}) => {
    const {windowWidth,windowHeight} = useTypedSelector(state=> state.adaptive)
    const elRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (elRef.current) {
        setWidth(elRef.current.offsetWidth)
        setHeight(elRef.current.offsetHeight)
      
      }
    }, []);

    return (
      <div className={`${style.slider} ${className}`} ref={elRef} id="nav-bar" style={{height: windowHeight, maxHeight: windowHeight, minHeight:windowHeight}}>
        {children}
        
      </div>
    )
}

export default Sidebar
