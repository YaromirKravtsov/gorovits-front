import React, { FC, useState } from 'react'
import style from './ProfileInput.module.css'
interface Props{
    label: string;
    placeholder: string;
    name:string;
    onChange: (value:string)=> void;
    value: string;
}
const ProfileInput:FC<Props> = (props) => {
    const [inputValue,setInputValue] = useState<string>(props.value);
    const handleChange = (value:string) =>{
        setInputValue(value);
        props.onChange(value)
    }
  return (
    <div className={style.container}>
        <div className={style.label}>{props.label}</div>
        <input type="text" 
        name={props.name}
        className={style.input}
        value={inputValue}
        onChange={e=> handleChange(e.target.value)}
        placeholder={props.placeholder}
        />
    </div>
  )
}

export default ProfileInput
