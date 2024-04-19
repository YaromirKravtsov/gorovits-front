import React, { FC, useState } from 'react'
import RoundIconButton from '../RoundIconButton/RoundIconButton'
import questionIcon from '../../assets/images/question-icon.png';
import style from './QuestionMark.module.css'
type DroPosition = 'bottom-left' |'bottom-right'  
type Size = 'large' |'small'  
interface QuestionMark{
    text: string;
    droPosition?: DroPosition,
    size?: Size
}
const QuestionMark:FC<QuestionMark> = ({text,droPosition = 'bottom-left',size ='large'}) => {
  const [isOpen,setIsOpen] = useState<boolean>()
  return (
    <div>
        <RoundIconButton imageClassName = {`${size == 'small' && style.smallIcon}`}className ={`${style.icon} ${size == 'small'? style.small:''}`} src = {questionIcon} onClick = {()=>setIsOpen(!isOpen) }onMouseOut={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)} />
         <div className={`${style.textBlock} ${isOpen? style.open : ''} ${droPosition == 'bottom-right' ?style.bottomRight: ''}`} >
            {text}
         </div>
    </div>
  )
}

export default QuestionMark
