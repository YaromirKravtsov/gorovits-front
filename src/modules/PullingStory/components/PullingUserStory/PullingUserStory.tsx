import { FC, useEffect, useState } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
import PullingCard from '../../../../components/PullingCard/PullingCard';
import Loader from '../../../../UI/Loader/Loader';
import style from './PullingUserStory.module.css'

const PullingUserStory:FC = () => {
  const {userInfo} = useTypedSelector(state=> state.user);
  const {pullings,isLoaded} = useTypedSelector(state=> state.pulling);
  const {getUserPulling,setRatingPillingId,setIsInRating} = useActions();
  
  useEffect(()=>{
      const fetch = async() =>{
          await getUserPulling(userInfo.userId);
      }
      fetch()
  },[])
  
  const onRate = (pullingId:number)=>{
    console.log(pullingId)
    setRatingPillingId(pullingId);
    setIsInRating(true)
  }

  return (
    <div className={style.pullingsRow}>
      {isLoaded?
          <>
          {pullings.length == 0?
            <div className={style.noRecords}>Sie haben noch keine Bespannungen</div>
          :
          <>
            {pullings.map(pulling=>
               <PullingCard key ={pulling.id} pulling={pulling} type='userStory' onRate={() => onRate(pulling.id)}/>  
            )}
          </>
          }
          </>
       :
        <Loader/>
      }
       
    </div>
  )
}

export default PullingUserStory
