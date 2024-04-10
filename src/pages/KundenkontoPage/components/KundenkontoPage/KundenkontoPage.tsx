import  { FC, useEffect, useState } from 'react'
import PageLayout from '../../../../components/Layout/PageLayout/PageLayout';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';

import KundenKontoTopMenu from '../KundenKontoTopMenu/KundenKontoTopMenu';
import AktuellenTermine from '../AktuellenTermine/AktuellenTermine';
import Row from '../../../../components/Layout/Row/Row';
import style from './KundenkontoPage.module.css'
import KundenKontoService from '../../api/services/UserInfoService';
import { GetAktuallenTermineResponse } from '../../api/responses/UserInfoResponse';
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import LastPulling from '../LastPulling/LastPulling';
import UserInfo from '../UserInfo/UserInfo';
import { Helmet } from 'react-helmet';

const KundenkontoPage:FC= () => {
  const {getUserInfo} = useActions();
  const {userInfo} = useTypedSelector(state => state.user);
  const [aktuellenTermine,setAktuellenTermine] = useState<GetAktuallenTermineResponse[]>([])
  useEffect(()=>{
        const effect = async()=>{
          getUserInfo(userInfo.userId);
          const {data} = await KundenKontoService.getAktuallenTermine(userInfo.userId);
          setAktuellenTermine(data);
        }
        effect();
  }, []);
  const pageText = 'Auf der Seite "Dein Kundenkonto" kannst du dein Profilbild, deinen Namen, deine E-Mail-Adresse und Telefonnummer sowie deine aktuellen Themen und Laufzeiten ohne iTunes anzeigen. Außerdem kannst du dein Passwort ändern und deine Benutzerinformationen aktualisieren.'
  return (
      <>
    <Helmet>
      <title>Dein Kundenkonto</title>
    </Helmet>
        <PageLayout topMenu ={<KundenKontoTopMenu/>} title = 'Dein Kundenkonto' questionMarkText={pageText}>
          <Row className={style.topRow}>
            <UserInfo/>
            <AktuellenTermine aktuellenTermine ={aktuellenTermine}/>
            </Row>
            <LastPulling /* pulling = {} *//>
      
        </PageLayout>
      </>

  )
}

export default KundenkontoPage;
