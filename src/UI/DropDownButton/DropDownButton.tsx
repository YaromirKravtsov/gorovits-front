import  { FC, useState } from 'react';
import style from './DropDownButton.module.css'
import MyButton from '../MyButton/MyButton';
import MyImage from '../MyImage/MyImage';
import arrow from '../../assets/images/arrow.png'
interface Props{
    options: {
      text: string;
      value: number;
    }[], 
    onSelect: (option:number) => void,
    title: string
}
const DropDownButton:FC<Props> = (props) => {
     const [isOpen,setIsOpen] = useState<boolean>(false);
    const handleClick = ()=>{
        if(isOpen) setIsOpen(false);
        else setIsOpen(true);
   

    }
    const handleSelect = (option:number)=>{
        setIsOpen(false)
        props.onSelect(option);
    }
    return (
      <div>
        <MyButton onClick={()=>handleClick()} className={style.button} mode='black'>{props.title} <MyImage alt ='arrow' src ={arrow} className={`${style.arrow} ${isOpen&&style.grad}`} /> </MyButton>
        {isOpen&&
            <div className={style.dropDownList}>
                {props.options.map((option,index)=>
                    <button className={style.dropDownItem} key={index} onClick={()=> handleSelect(option.value)}>{option.text}</button>
                )}
            </div>
        }
       
      </div>
    ); 
  };

export default DropDownButton;