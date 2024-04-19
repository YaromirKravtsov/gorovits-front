import React, { FC, useEffect, useState } from 'react'
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import UserRacket from '../UserRacket/UserRacket';
import style from './UserRacketsRow.module.css'
import Loader from '../../../../UI/Loader/Loader';
import arrow from '../../../../assets/images/arrow.png'
import './slider.css'
// Slider 
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MyButton from '../../../../UI/MyButton/MyButton';
interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

const NextArrow: FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <div className={`${className} `} style={{ ...style, display: "block" }} onClick={onClick}>
      <img src={arrow} alt="Next" className={style.nextArrowIcon}/>
    </div>
  );
}

const PrevArrow: FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
      <img src={arrow} alt="Previous" className={style.prevArrowIcon}/>
    </div>
  );
}
const UserRacketsRow: FC = () => {
  const { fetchRackets } = useActions();
  const { userInfo } = useTypedSelector(state => state.user)
  const { rackets, isLoading } = useTypedSelector(state => state.racket);
  const { windowWidth, windowHeight } = useTypedSelector(state => state.adaptive);
  const [sliderSettings, setSliderSettings] = useState<{}>({})
  useEffect(() => {
    fetchRackets(userInfo.userId);
    
    // Создаем объект с настройками слайдера
    let slidesToShow: number = 0;
    if(windowWidth <= 600){
      slidesToShow = 1
    }else if(windowWidth<=1480){
      slidesToShow = 2
    }else if(windowWidth<=1650){
      slidesToShow = 3
    }
    else{
      slidesToShow = 4
    }
    /* windowWidth <= 600 ? 1 :(1180 <= windowWidth ? 2: 4); */
    
    const newSliderSettings:Settings = {
      infinite: true,
      speed: 300,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      variableWidth: true,
      centerMode: false,
      centerPadding: '0',
      cssEase: 'ease-in-out',
      dots: windowWidth <= 600
    };

  
    if (windowWidth >= 600) {
    /*   // @ts-ignore */
      newSliderSettings.nextArrow = <NextArrow/>;
    /*    // @ts-ignore */
      newSliderSettings.prevArrow = <PrevArrow/>;
    }
    
    // Устанавливаем новые настройки слайдера
    setSliderSettings(newSliderSettings);
  }, [windowWidth, windowHeight]);
  

  if (rackets.length <= 4 && windowWidth >= 1650 || rackets.length <= 1 && windowWidth <= 1650) {
    return (
      <div className={`${style.racketsRow} ${style.one}`}>
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
 
        <>
               <Loader />
            {console.log('workkk')}
        </>
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
