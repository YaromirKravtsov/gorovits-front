import { FC } from 'react'
import style from './PersonalInfoNoraml.module.css'
import { useTypedSelector } from '../../../hooks/useTypedSelector';

interface Props{
  className?: string
}
const PersonalnfoNormal: FC<Props> = (props) => {
  const { userInfo } = useTypedSelector(state => state.user)
  return (
    <div className={`${style.container} ${props.className? props.className: ''}`}>
      <div className={`${style.textRow}`}>
        <div className={style.title}>Name</div>
        <div className={style.text}>{userInfo.fullName}</div>
      </div>
      <div className={`${style.textRow}`}>
        <div className={style.title}>Email</div>
        <div className={style.text}>{userInfo.email}</div>
      </div>
      <div className={`${style.textRow}`}>
        <div className={style.title}>Telefonnummer</div>
        <div className={style.text}>{userInfo.phoneNumber}</div>
      </div>
     
    </div>
  )
}

export default PersonalnfoNormal
