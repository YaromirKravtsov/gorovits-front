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
        <div  className ={`${style.icon} ${size == 'small'? style.small:''}`} 
        onClick = {()=>setIsOpen(!isOpen) }onMouseOut={()=>setIsOpen(true)} 
        onMouseLeave={()=>setIsOpen(false)}
        onMouseEnter={()=>setIsOpen(true)}
        >
          
          <img src = {questionIcon} className={`${size == 'small' ? style.smallIcon : style.iconImg}`} alt="" />
        </div>
         <div className={`${style.textBlock} ${isOpen? style.open : ''} ${droPosition == 'bottom-right' ?style.bottomRight: ''}`} >
            {text}
         </div>
    </div>
  )
}

export default QuestionMark
