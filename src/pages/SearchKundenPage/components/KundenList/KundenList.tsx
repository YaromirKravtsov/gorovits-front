import React, { FC } from 'react'
import { IUser } from '../../../../models/IUser'
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import style from './KundenList.module.css'
import BorderMenu from '../../../../UI/BorderMenu/BorderMenu';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../UI/Loader/Loader';
interface Props{
  userList:IUser[],
  isLoading: boolean
}

const KundenList:FC<Props> = (props) => {
  const navigate = useNavigate()
  if(props.isLoading){
      return <Loader/>
  }
  if(props.userList.length <= 0){
    return <div className={style.error}>Es wurden keine Benutzer gefunden </div>
  }
  return (
    <div className={style.main}>
      {props.userList.map((user,index)=>
      <div onClick ={()=> navigate(`/user-account/${(user).id }`)}key ={index}>
        <GradientBlackBlock className={style.gradientBlock}  >
          <BorderMenu className={style.block}>
            {user.fullName}
          </BorderMenu>

          <BorderMenu className={style.block}>
            {user.phoneNumber}
          </BorderMenu>

          <BorderMenu className={style.block}>
            {user.email}
          </BorderMenu>
        </GradientBlackBlock>
      </div>
        )}
    </div>
  )
}

export default KundenList
