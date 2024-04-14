import  { FC } from 'react'
import style from './RoundIconButton.module.css';
import MyImage from '../MyImage/MyImage';

interface RoundIconButton{
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    src: string;
    className?:string;
    imageClassName?:string;
    onMouseOut?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RoundIconButton:FC<RoundIconButton> = (props) => {
    const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault(); // Предотвращаем стандартное действие кнопки
        if(props.onClick)
        props.onClick(event);
    };
  return (
    <button className={`${style.button} ${props.className}`} onClick={clickHandler}  
    onMouseLeave={props.onMouseLeave}
    onMouseOut ={props.onMouseOut}>
        <MyImage src={props.src} alt='icon-button' className={`${props.imageClassName} ${style.img}`}/>
    </button>
  )
}

export default RoundIconButton
