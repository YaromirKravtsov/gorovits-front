import React, { FC, useEffect, useState } from 'react'
import addProfileIcon from '../../assets/images/profile/add-profile-photo.png'
import style from './PhotoSelection.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import FlutterMenu, { flutterShadowType } from '../../UI/FlutterMenu/FlutterMenu';
import MyImage from '../../UI/MyImage/MyImage';
import ImageUploader from '../ImageUploader/ImageUploader';
import MyButton from '../../UI/MyButton/MyButton';
import { profilePhotos } from '../../constants/profilePhoto';

interface Props{
    setIsOpen: (isOpen:boolean)=>void;
    shadow: flutterShadowType | 'admin';
    onSelect?: (value: SelectedImage) => void
}
interface focusImage{
    name: string;
    index:number;
}
export interface SelectedImage{
    focusImage: focusImage,
    uploadedFile: File | null
}
const PhotoSelection:FC<Props> = (props) => {
    const {userInfo} = useTypedSelector(state => state.user);
    const {putPhoto} = useActions()
    const [focusedIndex, setFocusedIndex] = useState<focusImage>(
        {
            name: '',
            index:-1,
        }
    ); 
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const handleMenuClick = (dto:focusImage) => {
        if(props.onSelect){
            props.onSelect({focusImage: dto, uploadedFile})
        }
        setFocusedIndex(dto); // Устанавливаем фокус на элементе с индексом index
    };
    useEffect(()=>{

        if(props.onSelect){
            props.onSelect({focusImage: focusedIndex , uploadedFile})
        }
    },[uploadedFile,focusedIndex])
    const handlePhotoChange = () =>{
        const name  = focusedIndex.name;
     
          putPhoto(userInfo.userId, uploadedFile,name);
          if(props.onSelect){
            props.onSelect({focusImage: focusedIndex , uploadedFile})
          }
      
          props.setIsOpen(false)
        
    }
  
    
  
    
  return (
    <FlutterMenu shadow={props.shadow == 'admin' ? 'small': 'all'} 
    className={`${style.changePhotoFlutter} ${props.shadow == 'admin' ? style.adminFlutter: ''}`}>
        <div className={style.edditTitle}>Foto ändern</div>
        <div className={style.photosItems}>

        {
            profilePhotos.map((photo,index)=>(
                <MyButton key ={index} className={`${style.changePhotoItem} ${index === focusedIndex.index? style.focus: ''}`} onClick={()=> handleMenuClick({index, name: photo.name})}  >
                     <MyImage  className= {style.changePhoto} src= {photo.src} alt = {photo.name}/>
                </MyButton>
            
            ))
        }
    <FlutterMenu shadow='small' className={`${style.changePhotoItem} ${3 === focusedIndex.index? style.focus: ''}`}  onClick={() => handleMenuClick({ index: 3, name: 'custom' })}>
        <ImageUploader onFileChange={file => {
            setUploadedFile(file);
            setFocusedIndex({ index: 3, name: 'custom' }); // Обновляем focusedIndex при выборе кастомного фото
        }} src={addProfileIcon} className={style.changePhoto} />
    </FlutterMenu>
   
        </div>
        {props.shadow !== 'admin' && 
            <div className={style.buttons}>
                <MyButton mode='white' border onClick={()=>props.setIsOpen(false)} className={style.actionButton}>
                    Schließen
                </MyButton>
                <MyButton mode='black' onClick={()=>handlePhotoChange()} className={style.actionButton}>
                 Ändern 
                </MyButton>
            </div>
        }
    </FlutterMenu>
  )
}

export default PhotoSelection
