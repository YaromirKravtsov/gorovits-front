import  { FC, useEffect, useState } from 'react'
import { GetPullungResponse } from '../../pages/KundenkontoPage/api/responses/UserInfoResponse';
import GradientBlackBlock from '../../UI/GradientBlackBlock/GradientBlackBlock';
import style from './PullingCard.module.css'
import Row from '../Layout/Row/Row';
import Column from '../Layout/Column/Column';
import BorderMenu from '../../UI/BorderMenu/BorderMenu';
import FormatDate from '../../helpers/dates';
import RecordHeler from '../../helpers/recordHelper';
import MyImage from '../../UI/MyImage/MyImage';
import { feedbackPhotos } from '../../constants/feedback';
import MyButton from '../../UI/MyButton/MyButton';
import { Pulling } from '../../modules/PullingStory/store/pulling/types';
import RacketStringPhoto from '../../UI/RacketStringPhoto/RacketStringPhoto';

type CardSize = 'small' | 'normal';
type PullingType = 'racketStory' | 'userStory' ;
interface Props{

    pulling: Pulling;
    type: PullingType,
    onRate:(racketId:number)=>void
}

const PullingCard:FC<Props> = (props) => {

  return (
    <GradientBlackBlock className={style.pullingCard}>
        <Row className={style.mainRow}>
            <Column>
              <BorderMenu className={style.leftTop}>
                {props.type == 'racketStory' &&<>Zuletzt besaitet am {FormatDate.SqlToDate(props?.pulling?.record?.dateTime )}</>}
                {props.type == 'userStory' &&<>Schläger Nr. {props.pulling?.userRacket?.number}</>}
              </BorderMenu>
              <BorderMenu className={style.leftButton}>
                  <div className={style.stringHardnes}>{props?.pulling?.stringHardness&& RecordHeler.formatStringHardnes(props?.pulling?.stringHardness)  }</div>
                  <div className={style.stringName}>{RecordHeler.formatStringsName(props?.pulling?.longString, props?.pulling?.crossString)  }</div>
              </BorderMenu>
            </Column>
              <RacketStringPhoto 
              racketSrc={props?.pulling.userRacket.racketModel.imgLink}
              stringSrc={props?.pulling.string.imgLink}
              />
            <Column>
            {props.type == 'userStory'&&
              <BorderMenu className={`${style.dateTimeBlock} ${style.leftTop}`}>
             <div>Neu bespannt:</div><div> {FormatDate.SqlToDate(props.pulling.record.dateTime)/* { props.pulling.record.dateTime} */}</div>
            </BorderMenu>
            }
              
              <BorderMenu className={style.leftTop}>
                {props?.pulling?.feedback !== null?
                <>
                  Bewertet <MyImage src ={feedbackPhotos[Number(props?.pulling?.feedback)].src } alt = '' className={style.feedbackPhoto}/>
                </>
                :
                <>
                Nicht bewertet
                </>

              }
                
              </BorderMenu>
            
                  <MyButton className={style.button} mode='white' onClick={()=>props.onRate(props.pulling.id)}>
                    Bewertung
                  </MyButton>
                  
            </Column>
        </Row>
    </GradientBlackBlock>
  )
}

export default PullingCard;

