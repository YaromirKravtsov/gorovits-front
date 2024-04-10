import React, { FC, useState } from 'react'
import RoundIconButton from '../RoundIconButton/RoundIconButton'
import questionIcon from '../../assets/images/question-icon.png';
import style from './QuestionMark.module.css'
interface QuestionMark{
    text: string;
}
const QuestionMark:FC<QuestionMark> = ({text}) => {
  const [isOpen,setIsOpen] = useState<boolean>()
  return (
    <div>
        <RoundIconButton src = {questionIcon} onClick = {()=>setIsOpen(!isOpen) }onMouseOut={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)} />
        {isOpen&&
         <div className={`${style.textBlock}`} >
            {text}
         </div>
        }
     
    </div>
  )
}

export default QuestionMark
