import React, { useEffect } from 'react'
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import UserRacket from '../UserRacket/UserRacket';
import style from './UserRacketsRow.module.css'
import Loader from '../../../../UI/Loader/Loader';
import arrow from '../../../../assets/images/arrow.png'
import './slider.css'
// Slider 
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MyButton from '../../../../UI/MyButton/MyButton';

const UserRacketsRow = () => {
      const {fetchRackets} = useActions();
  const {userInfo} = useTypedSelector(state=> state.user)
  const {rackets,isLoading} = useTypedSelector(state=> state.racket)
  useEffect(() => {

    fetchRackets(userInfo.userId);
  }, []);
  // Slider
  const sliderSettings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4, // Количество видимых слайдов
    slidesToScroll: 1, // Количество прокручиваемых слайдов за раз
    variableWidth: true, // Разрешить переменную ширину слайдов
    centerMode: false, // Отключить центральный режим
    centerPadding: '0', // Отступы для центрирования (0, чтобы расположить слайды по краям)
    cssEase: 'ease-in-out', // Сглаживание анимации
    nextArrow: <div className={style.nextArrow} ><img src={arrow} alt=""className={style.nextArrowIcon} /> </div>,
    prevArrow: <div className={style.prevArrow} ><img src={arrow} alt="" className={style.prevArrowIcon} /> </div>

  };
  console.log()
  if(rackets.length <=4){

  return (
    <div className={`${style.racketsRow}`}>
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
    <div className={`${style.racketsRow} ${style.racketsRowPadding}`}>
      {isLoading?
        <Loader/>
      :
      <>
        <Slider {...sliderSettings}>
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
