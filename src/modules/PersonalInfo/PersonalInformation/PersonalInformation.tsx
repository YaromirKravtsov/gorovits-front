import  { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import PersonalnfoNormal from '../PersonalInfoNoraml/PersonalInfoNoraml';
import PersonalnfoEdit from '../PersonalInfoEdit/PersonalInfoEdit';
import style from "./PersonalInformation.module.css";
import { useActions } from '../../../hooks/useActions';
import { IUser } from '../../../models/IUser';
interface Props{
  isEditing?: boolean,
  className?:string
}
const Personalnformation:FC<Props> = (props) => {
  const {isEditing,role} = useTypedSelector(user=> user.user);
  const {setIsEditing,setUser} = useActions()
  useEffect(()=>{
    if(props.isEditing !== undefined){
      setIsEditing(props.isEditing);
    }
    if(role =='admin'){
      setUser({} as IUser)
    }
  },[]);

  return (
    <div className={`${style.personalnfo} ${props.className ? props.className: ''}`}>
      {isEditing?
      <>
         <PersonalnfoEdit/>
      </>
      :
      <>
        
          <PersonalnfoNormal /* userInfo= {props.userInfo} *//>
      </>
    }
    </div>
  )
}

export default Personalnformation
