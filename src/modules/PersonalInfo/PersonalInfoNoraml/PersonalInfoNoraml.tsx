import  { FC } from 'react'
import style from './PersonalInfoNoraml.module.css'
import TitleText from '../../../components/TitleText/TitleText'
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IUser } from '../../../models/IUser';
/* interface Props{
  userInfo: IUser
} */
const PersonalnfoNormal:FC = () => {
  const {userInfo} = useTypedSelector(state=> state.user)
  return (
    <div className={style.container}>
      <TitleText title = 'Name' text={userInfo.fullName }/>
      <TitleText title = 'Email' text={userInfo.email || 'Unknown'} className={style.center}/>
      <TitleText title = 'Telefonnummer' text={userInfo.phoneNumber || 'Unknown'}/>
    </div>
  )
}

export default PersonalnfoNormal
