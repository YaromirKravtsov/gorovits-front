
import React,{ FC } from 'react'
import MyImage from '../MyImage/MyImage';
import style from './RacketStringPhoto.module.css'
import Column from '../../components/Layout/Column/Column';
interface Props{
    racketSrc:string;
    stringSrc: string;
}
const RacketStringPhoto:FC<Props> = (props) => {
  return (
    <Column className={style.centerBlock}>
    <MyImage src ={props.racketSrc} alt ='' className={style.racketImage}/>
    <MyImage src ={props.stringSrc} alt ='' className={style.stringImage}/>
  </Column>
  )
}

export default RacketStringPhoto
