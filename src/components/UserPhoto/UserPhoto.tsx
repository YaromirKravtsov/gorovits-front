import React, { FC, useEffect, useState } from 'react'
import style from './UserPhoto.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import FlutterMenu from '../../UI/FlutterMenu/FlutterMenu'
import MyImage from '../../UI/MyImage/MyImage'
import MyButton from '../../UI/MyButton/MyButton'
import PhotoSelection, { SelectedImage } from '../PhotoSelection/PhotoSelection'

interface Props{
  onChange?: (value:SelectedImage) => void,
  isEdditing?: boolean,
  className?:string
}
const UserPhoto:FC<Props> = (props) => {
    const {photoLink,isEditing,role} =  useTypedSelector(state => state.user)

    const [flutterIsOpen, setFlutterIsOpen] = useState<boolean>(false);
    useEffect(()=>{
      if(props.isEdditing){
        setFlutterIsOpen(true)
      }
    },[])
    if(props.isEdditing){
      return(
        <PhotoSelection setIsOpen={setFlutterIsOpen} shadow='admin' onSelect = {(value:SelectedImage) => props.onChange&&props.onChange(value)}/>
      )
    }
  return (
    <>
        <FlutterMenu shadow='small' className={`${style.flutter} ${props.className}`} >
            <MyImage alt = 'user profile image' src={photoLink} className={style.img}/>
            {isEditing &&
            <MyButton className={style.editButton} onClick={()=> setFlutterIsOpen(true)}>Foto ändern</MyButton>
            }
            {isEditing&&
            <div className={style.blure}></div>
            }
        </FlutterMenu>
          
            {flutterIsOpen &&
                <PhotoSelection setIsOpen={setFlutterIsOpen} shadow='all'/>
            }
       
    </>
  )
}

export default UserPhoto
