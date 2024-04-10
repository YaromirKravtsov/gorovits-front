import React, { FC, ReactNode, useEffect, useState } from 'react'
import style from './FlutterMenu.module.css'
export type flutterShadowType = 'all' | 'small'
interface FlutterMenuProps {
    children: ReactNode;
    className?:string
    width?:number;
    height?: number;
    hidden?: boolean;
    shadow: flutterShadowType;
    focus?: boolean;
    onClick?: ()=> void;
    handelClose?: (value: boolean) => void,
    id?: string

}
const FlutterMenu: FC<FlutterMenuProps> = (props) => {
    const menuStyle = {
        width: props.width,
        height:props.height,
        display: props.hidden ? 'none' : 'flex', // Устанавливаем display: none, если hidden = true
        boxShadow: props.focus ? '0px 0px 40px rgba(0, 0, 0, 0.7)': '',

    };
    
    const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Проверяем, был ли клик вне области меню

        if (event.target === event.currentTarget) {
            if(props.handelClose){
                props.handelClose(false)
            }
            
            // Вызываем функцию onClick, переданную через props
            if (props.onClick) {
                props.onClick();
            }
        }
    };
  return (
    <div className={`${props.shadow == 'all' ? style.defaultWraper : ''}`} onClick={handleWrapperClick}  style={{display: props.hidden? 'none':'flex'}}>
        <div className = {`${props.className} ${style.menu} ${props.shadow == 'small' ? style.small : style.index}`} style={menuStyle} onClick={props.onClick} id = {props.id}>
            {props.children}
        </div>
    </div>
  )
}

export default FlutterMenu;
