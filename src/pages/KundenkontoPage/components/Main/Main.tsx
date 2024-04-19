import React, { useEffect, useState } from 'react'
import Row from '../../../../components/Layout/Row/Row'
import UserInfo from '../UserInfo/UserInfo'
import style from './Main.module.css'
import AktuellenTermine from '../AktuellenTermine/AktuellenTermine'
import LastPulling from '../LastPulling/LastPulling'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import UserInfoService from '../../api/services/UserInfoService'
import { GetAktuallenTermineResponse } from '../../api/responses/UserInfoResponse'
import ChangePasswordMenu from '../../../../components/ChangePasswordMenu/ChangePasswordMenu'
import MyButton from '../../../../UI/MyButton/MyButton'
const Main = () => {
  const { getUserInfo } = useActions();
  const { userInfo,isEditing } = useTypedSelector(state => state.user);
  const { windowWidth } = useTypedSelector(state => state.adaptive);
  const [aktuellenTermine, setAktuellenTermine] = useState<GetAktuallenTermineResponse[]>([])
  const [isPassMenuOpen, isetIsPassMenuOpen] = useState<boolean>(false)
  useEffect(() => {
    const effect = async () => {

      getUserInfo(userInfo.userId);
      const { data } = await UserInfoService.getAktuallenTermine(userInfo.userId, windowWidth >= 600 ? 2 : 1);
      setAktuellenTermine(data);
    }
    effect();
  }, []);
  return (
    <div>
      <Row className={style.topRow}>
        <UserInfo />
        {(windowWidth < 600 &&isEditing) &&
          <MyButton onClick={() => isetIsPassMenuOpen(true)} mode='black' className={style.button}>Passwort ändern </MyButton>
        }
        <AktuellenTermine aktuellenTermine={aktuellenTermine} />
      </Row>
      <LastPulling /* pulling = {} */ />

      {isPassMenuOpen &&
        <ChangePasswordMenu userId={Number(userInfo.userId)} isOpenChange={(value: boolean) => isetIsPassMenuOpen(value)} />
      }
    </div>
  )
}

export default Main
