import React, { FC, useState } from 'react'
import style from './RacketCard.module.css';
import { IRacket } from '../../models/IRacket';
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import MyImage from '../../../../UI/MyImage/MyImage';
import HoverEffect from '../../../../UI/HoverEffect/HoverEffect';
import MyButton from '../../../../UI/MyButton/MyButton';
import DimOverlay from '../../../../UI/DimOverlay/DimOverlay';

interface Props{
    racket: IRacket
}
const RacketCard:FC<Props> = ({racket}) => {
  const [isHover,setIsHover] = useState<boolean>(false)
  return (
    <HoverEffect setIsHovered = {setIsHover}>
    <GradientBlackBlock className={style.racketBlock}>
        <MyImage alt='' src ={racket.imgLink} className={style.racketImg}/>
        <div className={style.racketName}>{racket.manufacturer.name} {racket.name}</div>
        <DimOverlay className={style.dimBlock}>
          <MyButton>
            dfdfddf
          </MyButton>
          <MyButton>
            dfdfddf
          </MyButton>
        </DimOverlay>
    </GradientBlackBlock>
    </HoverEffect>
  )
}

export default RacketCard
