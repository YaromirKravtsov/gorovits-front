import React, { FC, ReactNode } from 'react'
import style from './GradientBlackBlock.module.css'
interface Porps{
  children: ReactNode;
  className:string;
}

const GradientBlackBlock:FC<Porps> = (props) => {
  return (
    <div className={`${style.gradientBlackBlock} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default GradientBlackBlock
