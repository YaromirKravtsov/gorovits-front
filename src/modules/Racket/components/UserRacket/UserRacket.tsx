import React, { FC, useEffect } from 'react';
import style from './UserRacket.module.css';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { IRacket } from '../../../../models/IRacket';
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import BorderMenu from '../../../../UI/BorderMenu/BorderMenu';
import RecordHeler from '../../../../helpers/recordHelper';
import MyButton from '../../../../UI/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
import MyImage from '../../../../UI/MyImage/MyImage';
import { ITuningRecord } from '../../../../models/IRecord';
interface Props{
  racket: IRacket,
}


const UserRacket:FC<Props> = ({racket}) => {
  const navigate = useNavigate();
  return (
    <div className={style.racket}>
      <GradientBlackBlock className ={style.racketBlock}>
          <div className={style.racketNumber}>Schläger Nr. {racket.number}</div>
          <div className={style.racketCode}>{racket.code}</div>
          <BorderMenu className={style.borderBlock}>
            <div className={style.borderBlockTitle}>Besaitet</div>
            <div className={style.borderBlockSubTitle}>{RecordHeler.formatStringHardnes(racket.pulling.stringHardness)}</div>
            <div className={style.borderBlockStrings}>{RecordHeler.formatStringsName(racket.pulling.longString,racket.pulling.crossString )}</div>
            <MyButton mode='white' className={style.RacketButton} onClick={()=>navigate(`/besaitungsverlauf-für-Schläger/${racket.number}`)}>Verlauf</MyButton>
          </BorderMenu>
          <div className={style.imageBlock}>
          <MyImage alt ='' src = {racket.pulling.string.imgLink} className={style.stringImage}/>
            <MyImage alt ='' src = {racket.racketModel.imgLink}  className={style.racketgImage}/>
         
      
          </div>
          <BorderMenu className={style.borderBlock}>
            <div className={style.borderBlockTitle}>Tuning</div>
            
            {RecordHeler.isTuning(racket.tuning)?
           
              <div className={`${style.borderBlockSubTitle} ${style.borderBlockTuning}`}>
             {
              RecordHeler.renderTuningData((racket).tuning).map((el,index)=>
                <div key = {index}>{el} <br/></div>
              )
            }
              </div>
             
              :
              <>  <div className={`${style.borderBlockSubTitle} ${style.borderBlockTuning}`}>Kein Tunning</div>
               <MyButton mode='white' className={style.RacketButton} onClick={()=>navigate(`/besaitungsverlauf-Schläger/${racket.number}`)}>Tuning buchen</MyButton>
              </>
              } 
           
          </BorderMenu>
      </GradientBlackBlock>
    </div>  
  )
}

export default UserRacket
