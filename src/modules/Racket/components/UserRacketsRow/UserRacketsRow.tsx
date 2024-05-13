import React, { FC, useEffect, useRef, useState } from 'react';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import UserRacket from '../UserRacket/UserRacket';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import style from './UserRacketsRow.module.css';
import Loader from '../../../../UI/Loader/Loader';
import { Swiper as SwiperClass } from 'swiper/types';
import './slider.css';
import arrow from '../../../../assets/images/arrow.png'
import { Navigation, Pagination } from 'swiper/modules';
interface ArrowProps {
  className?: string;
  onClick?: () => void;
}

const NextArrow: FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <div className={`${className} ${style.arrow}  ${style.nextArrow}`} style={{ ...style, display: "block" }} onClick={onClick}>
      <img src={arrow} alt="Next" className={style.nextArrowIcon} />
      <>{console.log(arrow)}</>


    </div>
  );
}

const PrevArrow: FC<ArrowProps> = ({ className, onClick }) => {
  return (
    <div className={`${className} ${style.arrow} ${style.prevArrow} `} style={{ ...style, display: "block" }} onClick={onClick}>


      <img src={arrow} alt="Previous" className={style.prevArrowIcon} />
    </div>
  );
}



const UserRacketsRow: FC = () => {
  const { fetchRackets } = useActions();
  const { userInfo } = useTypedSelector(state => state.user);
  const { rackets, isLoading } = useTypedSelector(state => state.racket);
  const { windowWidth } = useTypedSelector(state => state.adaptive);
  const nextRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLDivElement>(null);

  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  useEffect(() => {
    fetchRackets(userInfo.userId);
  }, [userInfo.userId]);

  if (isLoading) {
    return <Loader />;
  }

  if ((rackets.length <= 3 && windowWidth >= 990) || (rackets.length <= 4 && windowWidth >= 1590) || rackets.length == 1) {
    return (
      <div className={`${style.racketsRow} ${style.one}`}>
        {isLoading ?
          <>
            {windowWidth >= 600 ? <Loader /> : <Loader size='small'/>}
          </>
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
    <div className={style.racketsRow}>

      {windowWidth >= 600 &&
        <div ref={prevRef}>
          <PrevArrow onClick={() => swiperInstance?.slidePrev()} />
        </div>
      }
      <Swiper
        spaceBetween={30} // расстояние между слайдами
        slidesPerView={windowWidth <= 700 ? 1 : (windowWidth <= 990 || (windowWidth <= 1500 && rackets.length >= 4 && windowWidth >= 1180)) ? 2 : (windowWidth <= 1740) ? 3 : 4} // адаптивное количество слайдов
        loop={true} // бесконечная прокрутка
        onSlideChange={() => console.log('slide change')}
        modules={[Navigation, Pagination]}

        navigation={{
          nextEl: nextRef.current,
          prevEl: prevRef.current
        }}
        onSwiper={(swiper: SwiperClass) => {
          swiper.navigation.init();
          swiper.navigation.update();
          setSwiperInstance(swiper); // Сохранение экземпляра swiper
        }}
        pagination={{ clickable: true }}
      >

        {rackets.map((racket) => (
          <SwiperSlide key={racket.id}>
            <UserRacket racket={racket} />
          </SwiperSlide>
        ))}
      </Swiper>
      {windowWidth >= 600 &&
        <div ref={nextRef}>
          <NextArrow onClick={() => swiperInstance?.slideNext()} />
        </div>
      }
    </div>
  );
};

export default UserRacketsRow;
