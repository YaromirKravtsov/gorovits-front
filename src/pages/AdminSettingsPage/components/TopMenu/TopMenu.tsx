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
import BlockeDateTime from '../BlockeDateTime/BlockeDateTime'
const TopMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [adminInfo, setAdminInfo] = useState<IUser>({} as IUser)
  const { setGlobalError, logout } = useActions()

  useEffect(() => {

    const effect = async () => {
      try {
        const { data } = await AdminSettingPageService.getAdminInfo()

        setAdminInfo(data)
      } catch (error) {
        setGlobalError(getErrorText(error))
      }


    }
    effect()
  }, [])



  const [isTimeBlockOpen, setIsTimeBlockOpen] = useState<boolean>(false);

  return (
    <>
      {isOpen &&
        <ChangePasswordMenu isOpenChange={setIsOpen} userId={adminInfo.id as number} />
      }
      {
        isTimeBlockOpen&&
        <>
          <BlockeDateTime close = {() =>setIsTimeBlockOpen(false) }/>
        </>
      }
      <div className={style.topMenu}>
        <MyButton mode='black' onClick={() => setIsTimeBlockOpen(true)} className={style.button}>
          Terminzeit blockieren
        </MyButton>
        <MyButton mode='black' onClick={() => setIsOpen(true)} className={style.button}>
          Passwort ändern
        </MyButton>
        <RoundIconButton onClick={() => logout()} src={logoutIcon} className={style.logOutIcon} />
      </div>
    </>
  )
}

export default TopMenu
