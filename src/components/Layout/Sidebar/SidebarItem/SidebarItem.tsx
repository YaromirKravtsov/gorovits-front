import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './SidebarItem.module.css';
import MyImage from '../../../../UI/MyImage/MyImage';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { navBarAdaptive } from '../../../../constants/adaptive';

interface SidebarItemProps {
    src: string;
    text: string;
    rout: string;
    isActive: boolean;
    onClick?: () => void; // Обновленный тип пропа onClick
    imgText?: string;
    profileImage?:string;
    imageClassName?: string
}

const SidebarItem: FC<SidebarItemProps> = (props) => {
    const activeClass = props.isActive ? style.active : '';
    const {setIsNavOpen} = useActions()
    const {windowWidth} = useTypedSelector(state => state.adaptive)
    const handelClick = () =>{
        if(props.onClick)
        props.onClick();
    if(windowWidth <=navBarAdaptive){
        setIsNavOpen(false)
    }
    }
    return (
        <Link to={props.rout} className={`${style.item} ${activeClass}`} onClick={ handelClick}>
             {props.profileImage ?
                <div className={style.profileImage}>
                     <MyImage src={`${props.profileImage}`} alt={props.text} className={`${style.profilePhoto} `}/>
                </div>
                :
            <MyImage src={props.src} alt={props.text}  className={`${style.image} ${props.imageClassName}`}/>
            }
          
           
            <div className={style.text}>
            {props.imgText ?
                <MyImage src={props.imgText} alt={props.text} width={170} height={27}/>:<>{props.text}</> 
            }
            </div>
        </Link>
    );
}

export default SidebarItem;
