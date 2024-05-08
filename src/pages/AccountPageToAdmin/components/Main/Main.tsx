import React, { useEffect, useState } from 'react'
import { useActionData, useNavigate, useParams } from 'react-router-dom';
import Personalnformation from '../../../../modules/PersonalInfo/PersonalInformation/PersonalInformation';
import { useActions } from '../../../../hooks/useActions';
import UserPhoto from '../../../../components/UserPhoto/UserPhoto';
import style from './Main.module.css';
import Row from '../../../../components/Layout/Row/Row';
import MyButton from '../../../../UI/MyButton/MyButton';
import NewRackets from '../../../../modules/NewRackets/components/NewRackets/NewRackets';
import { AccountService, AdminUser } from '../../api/AccountService';
import { mapRacketsResponseToINewRacket } from '../../helpres';
import InfoFlutter from '../../../../UI/InfoFlutter/InfoFlutter';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { ISUser, IUser } from '../../../../models/IUser';
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import MyImage from '../../../../UI/MyImage/MyImage';
import PersonalnfoNormal from '../../../../modules/PersonalInfo/PersonalInfoNoraml/PersonalInfoNoraml';

const Main = () => {
  const { userId } = useParams();
  const {  setNewRackets } = useActions();

  const [userInfo,setUserInfo] = useState<AdminUser>({
    email: '',
    fullName: '',
    phoneNumber: '',
    photoLink: ''
  });

  const [isAccountDelete, setIsAccountDelete] = useState<boolean>();
  const navigate = useNavigate()
  useEffect(() => {
    const fetch = async () => {
      const userInfo =  await AccountService.getUserInfo(Number(userId));
      
      setUserInfo(userInfo.data)
      console.log(userInfo.data)
      const { data } = await AccountService.getUserRackets(Number(userId));

      const newracketsData = mapRacketsResponseToINewRacket(data)
      console.log(newracketsData)
      setNewRackets(newracketsData)
    }
    fetch()
  }, []);
  
  const handelDelete = () => {
    AccountService.deleteUser(Number(userId));
    setIsAccountDelete(false);
    navigate('/kunden')
  }
  return (
    <div className={style.main}>
      {isAccountDelete &&
        <InfoFlutter
          onisOpen={setIsAccountDelete}
          title='Benutzer löschen'
          text={`
        Sind Sie sicher, dass Sie den Benutzer ${userInfo.fullName}  löschen möchten?
        `}
          onCLick={handelDelete}
        />
      }
      <Row className={style.topRow}>
        <FlutterMenu shadow='small' className={style.userPhoto} >
          <MyImage src ={userInfo.photoLink}  alt={`${userInfo.fullName} photo`} className={style.userPhotoImg}/>
        </FlutterMenu>
        <PersonalnfoNormal userInfo={userInfo} />
        <div className={style.buttonRow}>
          <MyButton mode='black' className={style.button} link={`/benutzer-bestellung/?userId=${Number(userId)}&fullName=${userInfo.fullName}`}>
            Geschichte zu Aufträgen
          </MyButton>
          <MyButton mode='black' className={`${style.button} ${style.delete}`} onClick={() => setIsAccountDelete(true)}>
            Account löschen
          </MyButton>
        </div>
      </Row>
      <NewRackets editMode />

    </div>
  )
}

export default Main
