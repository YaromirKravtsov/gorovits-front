import  React,{ FC, useState } from 'react'
import MyButton from '../../../../UI/MyButton/MyButton'
import style from './EditingTopMenu.module.css'
import QuestionMark from '../../../../UI/QuestionMark/QuestionMark'
import RoundIconButton from '../../../../UI/RoundIconButton/RoundIconButton';
import SumbitChangesIcon from '../../../../assets/images/profile/confirm-account-changes-icon.png'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import ChangePasswordMenu from '../../../../components/ChangePasswordMenu/ChangePasswordMenu';


const EditingTopMenu:FC = () => {
    const {userEdititngInfo,userInfo} = useTypedSelector(state => state.user);
    const {windowWidth} = useTypedSelector(state => state.adaptive);
    const {setIsEditing,putUserInfo} = useActions()
    const [isPassMenuOpen, isetIsPassMenuOpen] = useState<boolean>()

    const submitChanges = ()=>{
        putUserInfo(userEdititngInfo);
        setIsEditing(false);
    }
  return (
    <>
    {isPassMenuOpen&&
    <ChangePasswordMenu userId={Number(userInfo.userId)} isOpenChange={(value:boolean) => isetIsPassMenuOpen(value)}/>
    }
    <div className={style.topEdit}>
      {}
      {windowWidth >=600&& <MyButton onClick={()=> isetIsPassMenuOpen(true)} mode='black' className={style.button}>Passwort ändern </MyButton>}
       <RoundIconButton onClick={submitChanges} src={SumbitChangesIcon} className={style.submitChanges} imageClassName = {style.submitChangesIcon}/>
    </div>
    </>
  )
}

export default EditingTopMenu
