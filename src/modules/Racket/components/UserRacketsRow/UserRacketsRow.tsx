import React, { useEffect } from 'react'
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import UserRacket from '../UserRacket/UserRacket';
import style from './UserRacketsRow.module.css'
import Loader from '../../../../UI/Loader/Loader';
// Slider 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const UserRacketsRow = () => {
      const {fetchRackets} = useActions();
  const {userInfo} = useTypedSelector(state=> state.user)
  const {rackets,isLoading} = useTypedSelector(state=> state.racket)
  useEffect(() => {

    fetchRackets(userInfo.userId);
  }, []);
  // Slider
  const sliderSettings = {
  
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2
  };
  console.log()
  if(rackets.length <=4){

  return (
    <div className={style.racketsRow}>
      {isLoading?
          <Loader/>
        :
        <>
          {rackets.map((racket)=>
            <UserRacket key = {racket.id} racket={racket}/>   
          )}
        </>
      }
    </div>
  )
    
  }
  return (
    <div className={style.racketsRow}>
      {isLoading?
        <Loader/>
      :
      <>
        <Slider {...sliderSettings}>
        {rackets.map((racket)=>
              <UserRacket key = {racket.id} racket={racket}/>   
        )}
         {rackets.map((racket)=>
              <UserRacket key = {racket.id} racket={racket}/>   
        )}
           {rackets.map((racket)=>
              <UserRacket key = {racket.id} racket={racket}/>   
        )}
         </Slider>
      </>
    }
 
    </div>
  )
}

export default UserRacketsRow
