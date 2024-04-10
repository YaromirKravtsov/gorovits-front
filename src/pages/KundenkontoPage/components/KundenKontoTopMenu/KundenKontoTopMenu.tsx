import React,{ FC } from 'react'
import RoundIconButton from '../../../../UI/RoundIconButton/RoundIconButton'
import editAccountIcon from '../../../../assets/images/edit-account-icon.png'
import logoutIcon from '../../../../assets/images/logout-icon.png'
import style from './KundenKontoTopMenu.module.css';
import QuestionMark from '../../../../UI/QuestionMark/QuestionMark';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import EditingTopMenu from '../EditingTopMenu/EditingTopMenu';


const KundenKontoTopMenu:FC = () => {
    const {logout,setIsEditing} = useActions();
    const {isEditing} = useTypedSelector(state => state.user)
    const editAccount = () =>{
       
        setIsEditing(true);
    }
    const onLogout = () =>{
      logout();
    }

  return (
    <>
        {isEditing?
              <EditingTopMenu/>
        :
            <>
            <RoundIconButton onClick={editAccount} src={editAccountIcon}/>
            <RoundIconButton onClick={onLogout} src={logoutIcon} className={style.middleIcon}/>
           
            </>
        }
       
    </>
  )
}

export default KundenKontoTopMenu;
