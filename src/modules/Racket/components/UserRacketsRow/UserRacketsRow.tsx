import React, { FC, useEffect, useState } from 'react'
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
const NextArrow: FC = () => {
  return (
    <div className={style.nextArrow} ><img src={arrow} alt="" className={style.nextArrowIcon} /> </div>
  )
}
const PrevArrow: FC = () => {
  return (
    <div className={style.prevArrow} ><img src={arrow} alt="" className={style.prevArrowIcon} /> </div>
  )
}
const UserRacketsRow: FC = () => {
  const { fetchRackets } = useActions();
  const { userInfo } = useTypedSelector(state => state.user)
  const { rackets, isLoading } = useTypedSelector(state => state.racket);
  const { windowWidth, windowHeight } = useTypedSelector(state => state.adaptive);
  const [sliderSettings, setSliderSettings] = useState<{}>({})
  useEffect(() => {
    fetchRackets(userInfo.userId);
    console.log(windowWidth, windowHeight)
    // Создаем объект с настройками слайдера
    const newSliderSettings: {} = {
      infinite: true,
      speed: 300,
      slidesToShow: windowWidth <= 600 ? 1 : 4,
      slidesToScroll: 1,
      variableWidth: true,
      centerMode: false,
      centerPadding: '0',
      cssEase: 'ease-in-out',
      dots: windowWidth <= 600
    };

    // Если ширина окна больше или равна 600, добавляем к настройкам стрелки
    if (windowWidth >= 600) {
      // @ts-ignore
      newSliderSettings.nextArrow = NextArrow;
      // @ts-ignore
      newSliderSettings.prevArrow = PrevArrow;
    }
    
    // Устанавливаем новые настройки слайдера
    setSliderSettings(newSliderSettings);
  }, [windowWidth, windowHeight]);
  

  if (rackets.length <= 4 && windowWidth >= 600) {
    return (
      <div className={`${style.racketsRow}`}>
        {isLoading ?
          <Loader />
          :
          <>
            {rackets.map((racket) =>
              <UserRacket key={racket.id} racket={racket} />
            )}
          </>
        }
      </div>
    )

  }

  return (
    <div className={`${style.racketsRow} ${windowWidth >= 600 && style.racketsRowPadding}`}>
      {isLoading ?
        <Loader />
        :
        <>
          <Slider {...sliderSettings}>
            {rackets.map((racket) =>
              <UserRacket key={racket.id} racket={racket} />
            )}

          </Slider>

        </>
      }
    </div>
  )
}

export default UserRacketsRow
