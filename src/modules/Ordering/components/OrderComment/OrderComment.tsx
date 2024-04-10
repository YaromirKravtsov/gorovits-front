import { FC, useState } from 'react'
import style from './OrderComment.module.css';

interface Props{
    onChange: (value: string) => void;
    value: string; // Добавляем проп value
}

const OrderComment:FC<Props> = (props) => {
    // Используем проп value для инициализации состояния
 // Используем значение из пропа, если оно есть


    const handelChange = (value:string) =>{
        
        props.onChange(value);
    }

    return (
        <div className={style.inputRow}>
            <div className={style.label}>Kommentar zur Bestellung </div>
            <textarea
                className={style.input}
                placeholder='Kommentar zur Bestellung  eingeben'
                value={props.value}
                onChange={e=> handelChange(e.target.value)}
            />
        </div>
    );
}

export default OrderComment;
