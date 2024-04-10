import React,{ FC, ReactNode } from 'react'
import style from './Content.module.css'
interface ContentProps{
    children: ReactNode;
}
const Content:FC<ContentProps> = ({children}) => {
  return (
    <div className = {style.content}>
      {children}
    </div>
  )
}

export default Content
