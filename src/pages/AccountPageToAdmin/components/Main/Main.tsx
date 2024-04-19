import React, { useEffect, useState } from 'react'
import { useActionData, useNavigate, useParams } from 'react-router-dom';
import Personalnformation from '../../../../modules/PersonalInfo/PersonalInformation/PersonalInformation';
import { useActions } from '../../../../hooks/useActions';
import UserPhoto from '../../../../components/UserPhoto/UserPhoto';
import style from './Main.module.css';
import Row from '../../../../components/Layout/Row/Row';
import MyButton from '../../../../UI/MyButton/MyButton';
import NewRackets from '../../../../modules/NewRackets/components/NewRackets/NewRackets';
import { AccountService } from '../../api/AccountService';
import { mapRacketsResponseToINewRacket } from '../../helpres';
import InfoFlutter from '../../../../UI/InfoFlutter/InfoFlutter';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

const Main = () => {
  const { userId } = useParams();
  const { getUserInfo, setNewRackets } = useActions();
  const { userInfo } = useTypedSelector(state => state.user)
  const [isAccountDelete, setIsAccountDelete] = useState<boolean>();
  const navigate = useNavigate()
  useEffect(() => {
    const fetch = async () => {
      await getUserInfo(Number(userId));
      const { data } = await AccountService.getUserRackets(Number(userId));
      console.log(data)
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
        <UserPhoto className={style.userPhoto} />
        <Personalnformation isEditing={false} />
        <div className={style.buttonRow}>
          <MyButton mode='black' className={style.button} link={`/benutzer-bestellung/?userId=${userInfo.userId}&fullName=${userInfo.fullName}`}>
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
