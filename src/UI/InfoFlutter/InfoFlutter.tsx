import { FC } from 'react'
import FlutterMenu from '../FlutterMenu/FlutterMenu';
import style from './InfoFlutter.module.css'
import MyButton from '../MyButton/MyButton';
interface Props{
    title: string,
    text:string,
    onisOpen: (value:boolean)=>void,
    onCLick?: ()=> void,
    actionString?:string
}
const InfoFlutter:FC<Props> = (props) => {
  return (
    <FlutterMenu shadow='all' className={style.flutter}>
            <div className={style.title}>{props.title}</div>
            <div className={style.text}>{props.text}</div>
            {props.onCLick?
              <div className={style.buttonRow}>
                 <MyButton mode='white' border className={style.button} onClick={()=> props.onisOpen(false)}>Schließen</MyButton>
                  <MyButton mode='black' className={style.button} onClick={()=> {props.onisOpen(false) ; props.onCLick&& props.onCLick()}}>{props.actionString? props.actionString: 'Löschen'}</MyButton>
            
              </div>
            :
            <MyButton mode='black' className={style.button} onClick={()=> props.onisOpen(false)}>Schließen</MyButton>
            }
           
    </FlutterMenu>
  )
}

export default InfoFlutter
