import React, { FC, useEffect, useState } from 'react'

import style from './PersonalInfoEdit.module.css';
import { IUser } from '../../../models/IUser';
import ProfileInput from '../ProfileInput/ProfileInput';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
interface Props{
  userInfo: IUser
}
const PersonalnfoEdit:FC = ({}) => {
  const {userInfo,role} = useTypedSelector(state => state.user);
  const {setUser,setUserEditingInfo} = useActions()
  const [email, setEmail] = useState<string>(userInfo.email || '');
  const [fullName, setFullName] = useState<string>(userInfo.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(userInfo.phoneNumber || '');
  useEffect(() => {
    if(role == 'admin'){
      setUser({
        email: email,
        fullName: fullName,
        phoneNumber: phoneNumber,
        userId: 0
      })
    }else{
      setUserEditingInfo({userId:userInfo.userId, email, fullName, phoneNumber });
    }
   
  }, [email, fullName, phoneNumber]);

  return (
    <div className={style.main}>
       <ProfileInput name ='fullName' onChange={(value)=> setFullName(value)} placeholder='Name eingeben' label='Name' value = {fullName}/>
        <ProfileInput name ='email' onChange={(value)=> setEmail(value)} placeholder='E-Mail eingeben' label='Email' value = {email}/>
        <ProfileInput name ='phoneNumber' onChange={(value)=> setPhoneNumber(value)} placeholder='E-Mail telefonnummer' label='Telefonnummer' value = {phoneNumber}/>
    </div>
  )
}

export default PersonalnfoEdit
