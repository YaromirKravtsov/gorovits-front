import React,{ FC, ReactNode } from 'react'
import style from './Content.module.css'
interface ContentProps{
    children: ReactNode;
    className:string,
    topStyle: {}
}
const Content:FC<ContentProps> = ({children, topStyle}) => {
  return (
    <div className = {style.content} style = {topStyle} >
      {children}
    </div>
  )
}

export default Content
