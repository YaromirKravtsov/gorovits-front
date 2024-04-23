
import React,{ FC } from 'react'
import MyImage from '../MyImage/MyImage';
import style from './RacketStringPhoto.module.css'
import Column from '../../components/Layout/Column/Column';
type Mode = 'vertical' | 'horizontal'
interface Props{
    racketSrc:string;
    stringSrc: string;
    mode?: Mode
}
const RacketStringPhoto:FC<Props> = (props) => {
  return (
    <Column className={style.centerBlock}>
      <div className={style.marginBlock}>
    <MyImage src ={props.racketSrc} alt ='' className={style.racketImage}/>
    <MyImage src ={props.stringSrc} alt ='' className={style.stringImage}/>
    </div>
  </Column>
  )
}

export default RacketStringPhoto
