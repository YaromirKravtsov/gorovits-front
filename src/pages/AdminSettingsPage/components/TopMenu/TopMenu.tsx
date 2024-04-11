import React, { useEffect, useState } from 'react'
import style from './TopMenu.module.css'
import MyButton from '../../../../UI/MyButton/MyButton'
import ChangePasswordMenu from '../../../../components/ChangePasswordMenu/ChangePasswordMenu'
import { AdminSettingPageService } from '../../api/AdminSettingPageService'
import { useActions } from '../../../../hooks/useActions'
import { getErrorText } from '../../../../helpers/FormDataGeneration'
import { IUser } from '../../../../models/IUser'
import RoundIconButton from '../../../../UI/RoundIconButton/RoundIconButton'
import logoutIcon from '../../../../assets/images/logout-icon.png'
const TopMenu = () => {
  const [isOpen,setIsOpen] = useState<boolean>(false);
  const [adminInfo,setAdminInfo] = useState<IUser>({} as IUser)
  const {setGlobalError,logout} = useActions()

  useEffect(()=>{
    
    const effect = async() =>{
      try{
          const {data} = await AdminSettingPageService.getAdminInfo()

          setAdminInfo(data)
      }catch(error){
        setGlobalError(getErrorText(error))
      }
      
    
    }
    effect()
  },[])
  return (
    <div className={style.topMenu}>
       <MyButton mode='black' onClick={()=> setIsOpen(true)}>
            Passwort ändern 
        </MyButton>
        <RoundIconButton onClick={() =>logout()} src={logoutIcon} className={style.logOutIcon}/>
        {isOpen&&
          <ChangePasswordMenu isOpenChange={setIsOpen} userId ={adminInfo.id as number}/>
        }
       
    </div>
  )
}

export default TopMenu
