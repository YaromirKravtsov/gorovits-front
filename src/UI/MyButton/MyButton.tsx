import  React,{ FC, ReactNode } from 'react'
import style from './MyButton.module.css'
import { Link, useNavigate } from 'react-router-dom';

export type buttonModeType = 'black' |'white';
interface MyButtonProps{
    children: ReactNode;
    mode?: buttonModeType;
    onClick?: () => void;
    width?: number;
    height?: number;
    type?: "button" | "submit" | "reset";
    className?:string;
    border?: boolean;
    disabled?:boolean;
    link?: string
}
const MyButton: FC<MyButtonProps> = ({...props}) => {
  const navigate = useNavigate()
    const modeClass = props.mode === 'black' ? style.black : style.white;
    const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if(props.onClick){
        props.onClick();
      }
  
    };

    const buttonStyles = {
      width: props?.width, 
      height: props?.height,
      border: props.border? '2px solid #232323': ''
    }
    if(props.type === 'submit'){
      return (
        <button 
        type ={props.type}
        className={`${props.className} ${style.button} ${modeClass} `} 
        style={buttonStyles} 
        disabled={props.disabled} 
        onClick={handleClick}
        >
          {props.children}
        </button>
      )
    }
  
  if(props.link){
    return (
      <Link to={props.link}>
        <button 
        type ={props.type}
        className={`${props.className} ${style.button} ${modeClass} `} 
        onClick={event => {handleClick(event);navigate(String(props.link))}}
        style={buttonStyles} 
        disabled={props.disabled} 
        >
          {props.children}
        </button>
      </Link>
    ) 
  }
  return (
    <button 
    type ={props.type}
    className={`${props.className} ${style.button} ${modeClass} `} 
    onClick={event => handleClick(event)}
    style={buttonStyles} 
    disabled={props.disabled} 
    >
      {props.children}
    </button>
  )
}

export default MyButton
