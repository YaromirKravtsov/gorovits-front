import React, { useEffect } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useActions } from '../../../../hooks/useActions';
import UserPhoto from '../../../../components/UserPhoto/UserPhoto';
import style from './UserInfo.module.css'
import Personalnformation from '../../../../modules/PersonalInfo/PersonalInformation/PersonalInformation';
const UserInfo = () => {
  
  return (
    <div className={style.userInfo}>
        <UserPhoto/>
        <Personalnformation />
    </div>
  )
}

export default UserInfo
