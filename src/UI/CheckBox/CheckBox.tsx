import React, { FC, useEffect, useState } from 'react'
import style from './CheckBox.module.css';
interface Props{
    setIsChecked: (value: boolean) => void,
    text: string,
    className?:string,
    isChecked?: boolean,
  
}
const CheckBox:FC<Props> = (props) => {


    const [isChecked, setIsChecked] = useState<boolean>(false);
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        props.setIsChecked(event.target.checked)
    };
    useEffect(()=>{
       if(props.isChecked !== undefined)
        setIsChecked(props.isChecked)
    },[props.isChecked])
    return (
        <div className={`${props.className} ${style.isToTestRow}`}>
            <div className={style.checkboxContainer}>
                <input type='checkbox' className={style.testCheckBox} checked={isChecked} onChange={handleCheckboxChange} />
                <span className={style.checkmark}></span>
            </div>
            <div className={style.isToTestText}>{props.text}</div>
        </div>
    )
}

export default CheckBox
