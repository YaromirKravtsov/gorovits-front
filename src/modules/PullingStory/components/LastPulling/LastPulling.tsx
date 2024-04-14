import React, { FC, useEffect, useState } from 'react'
import PullingCard from '../../../../components/PullingCard/PullingCard'
import { Pulling, PullingRating } from '../../store/pulling/types'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useActions } from '../../../../hooks/useActions'
import style from './LastPulling.module.css';
import MyButton from '../../../../UI/MyButton/MyButton'
import Loader from '../../../../UI/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import RateMenu from '../RateMenu/RateMenu'

const LastPulling:FC = () => {
    const {userInfo,isEditing} = useTypedSelector(state=> state.user);
    const {pullings,isLoaded} = useTypedSelector(state=> state.pulling);
    /* const [isRateOpen,setIsRateOpen] = useState<boolean>(false) */
    const {setLastPulling, setIsInRating,setRatingPillingId} = useActions()
    useEffect(()=>{
        const fetch = async() =>{
            await setLastPulling(userInfo.userId);
        }
        fetch()
    },[])
    const onRate = (pullingId:number)=>{
      console.log(pullingId)
      setRatingPillingId(pullingId);
      setIsInRating(true)
    }
    const navigate = useNavigate();
    const handelNavigate = () =>{
      navigate('/termine');
      

    }
  return (
    <>
        {isLoaded?
        <>
        {pullings[0]?
        <PullingCard type = 'userStory' pulling={pullings[0] as Pulling}  onRate={onRate}/>
        :
        <>
        <div className={style.noPulling}>
          <div className={style.noPullingText}>Du hast noch nichts besaitet. Höchste Zeit uns zu besuchen!</div>
          <MyButton mode ='black' className={style.noPullingButton} onClick={()=>handelNavigate()} disabled ={isEditing}>
             Zur Terminbuchung
          </MyButton>
        </div>
        </>
        }
        
        </>
        :
        <Loader/>
      }
      
      
       

    </>
  )
}

export default LastPulling
