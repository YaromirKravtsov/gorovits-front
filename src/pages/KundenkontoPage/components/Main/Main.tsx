import React, { useEffect, useState } from 'react'
import Row from '../../../../components/Layout/Row/Row'
import style from './Main.module.css'
import AktuellenTermine from '../AktuellenTermine/AktuellenTermine'
import LastPulling from '../LastPulling/LastPulling'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import UserInfoService from '../../api/services/UserInfoService'
import { GetAktuallenTermineResponse } from '../../api/responses/UserInfoResponse'
import ChangePasswordMenu from '../../../../components/ChangePasswordMenu/ChangePasswordMenu'
import MyButton from '../../../../UI/MyButton/MyButton'
import UserPhoto from '../../../../components/UserPhoto/UserPhoto'
import Personalnformation from '../../../../modules/PersonalInfo/PersonalInformation/PersonalInformation'
const Main = () => {
  const { getUserInfo, setIsEditing } = useActions();
  const { userInfo, isEditing, role } = useTypedSelector(state => state.user);
  const { windowWidth } = useTypedSelector(state => state.adaptive);
  const [aktuellenTermine, setAktuellenTermine] = useState<GetAktuallenTermineResponse[]>([])
  const [isPassMenuOpen, isetIsPassMenuOpen] = useState<boolean>(false)
  useEffect(() => {
    setIsEditing(false)
    const effect = async () => {

      getUserInfo(userInfo.userId);
      const { data } = await UserInfoService.getAktuallenTermine(userInfo.userId, windowWidth >= 600 ? 2 : 1);
      setAktuellenTermine(data);
    }
    effect();
  }, []);
  return (
    <>
      <Row className={style.topRow}>
        <div className={style.userInfo}>
          <UserPhoto />
          <Personalnformation />
        </div>
        {(windowWidth < 600 && isEditing) &&
          <MyButton onClick={() => isetIsPassMenuOpen(true)} mode='black' className={style.button}>Passwort ändern </MyButton>
        }
        <AktuellenTermine aktuellenTermine={aktuellenTermine} />
      </Row>


      <LastPulling /* pulling = {} */ />

      {isPassMenuOpen &&
        <ChangePasswordMenu userId={Number(userInfo.userId)} isOpenChange={(value: boolean) => isetIsPassMenuOpen(value)} />
      }
    </>
  )
}

export default Main
