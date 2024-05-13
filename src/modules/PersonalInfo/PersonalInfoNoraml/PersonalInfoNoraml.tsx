import { FC, useEffect, useState } from 'react'
import style from './PersonalInfoNoraml.module.css'
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { ISUser } from '../../../models/IUser';

interface Props{
  className?: string,
  userInfo?: ISUser
}
const PersonalnfoNormal: FC<Props> = (props) => {
  const { userInfo } = useTypedSelector(state => state.user)
  const [userInfoLocal,setUserInfoLocal] = useState<ISUser>({
    email: '',
    fullName: '',
    phoneNumber: ''
  } as ISUser );

  useEffect(()=>{
    console.log(props.userInfo)
    if(props.userInfo){
      setUserInfoLocal(props.userInfo)
    }else{
    
      setUserInfoLocal(userInfo as ISUser)
      console.log(userInfoLocal)
    }
  },[props.userInfo,userInfo])
  return (
    <div className={`${style.container} ${props.className? props.className: ''}`}>
      <div className={`${style.textRow}`}>
        <div className={style.title}>Name</div>
        <div className={style.text}>{userInfoLocal.fullName}</div>
      </div>
  
      <div className={`${style.textRow}`}>
        <div className={style.title}>Email</div>
        <div className={style.text}>{userInfoLocal.email}</div>
      </div>
      <div className={`${style.textRow}`}>
        <div className={style.title}>Telefonnummer</div>
        <div className={style.text}>{userInfoLocal.phoneNumber || 'keine Telefonnummer '}</div>
      </div>
     
    </div>
  )
}

export default PersonalnfoNormal
