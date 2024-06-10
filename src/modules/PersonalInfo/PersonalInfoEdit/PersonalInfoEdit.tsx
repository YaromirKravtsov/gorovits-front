import React, { FC, useEffect, useState } from 'react'

import style from './PersonalInfoEdit.module.css';
import { IUser } from '../../../models/IUser';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import InputRow from '../../../components/InputRow/InputRow';
import MyInput from '../../../components/MyInput/MyInput';

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
        <InputRow label='Name' labelClass={style.inpitTitle} className={style.inputRow}>
          <MyInput onChange={(value)=> setFullName(value)} placeholder='Name eingeben' name='fullName' value = {fullName} className={style.input}/>
        </InputRow>
        <InputRow label='Email' labelClass={style.inpitTitle} className={style.inputRow}>
          <MyInput onChange={(value)=> setEmail(value)} placeholder='E-Mail eingeben'  value = {email}  name='email' className={style.input} />
        </InputRow>
        <InputRow label='Telefonnummer' labelClass={style.inpitTitle} className={style.inputRow}>
          <MyInput name ='phoneNumber' onChange={(value)=> setPhoneNumber(value)} placeholder='Telefonnummer eingeben'value = {phoneNumber} className={style.input}/>
        </InputRow>
    </div>
  )
}

export default PersonalnfoEdit
