import React, { FC } from 'react'
import style from './TitleText.module.css'
interface Props{
    title:string;
    text:string;
    className?: string;
}
const TitleText:FC<Props> = (props) => {
  return (
    <div className={`${style.main} ${props.className}` }>
        <div className={style.title}>{props.title}</div>
        <div className={style.text}>{props.text}</div>
    </div>
  )
}

export default TitleText;
