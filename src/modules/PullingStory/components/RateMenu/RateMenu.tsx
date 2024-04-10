import  { FC, useEffect, useState } from 'react';
import style from './RateMenu.module.css'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import { PullingRating } from '../../store/pulling/types';
import { useActions } from '../../../../hooks/useActions';
import MyButton from '../../../../UI/MyButton/MyButton';
import MyImage from '../../../../UI/MyImage/MyImage';
import badRate from '../../../../assets/images/feedback/bad-feedback.png'
import goodRate from '../../../../assets/images/feedback/good-feedback.png'
import Row from '../../../../components/Layout/Row/Row';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
 type RateStates = "good" | 'bad' | 'none' 
const RateMenu:FC = () => {
    const {ratePulling,setIsInRating} = useActions();
    const {isInRating,ratingPullingId} = useTypedSelector(state=> state.pulling)
    const [rating,setRating] = useState<RateStates>('none');
    const [error,setError] = useState<boolean>()
    const handelSelected= (value:RateStates) =>{
        setRating(value);
        setError(false)
    }
    const handelRate =async ()=>{
        if(rating!== 'none'){
            setRating('none')
            setIsInRating(false)
            await ratePulling({pullingId:ratingPullingId, feedback: rating == 'good' })
        }
        else {
            setError(true)
        }
    }

    const handelClose = () =>{
        setIsInRating(false); 
        setRating('none');
        setError(false)
    }
  return (
    <FlutterMenu className={`${style.fluter}`} shadow='all' hidden = {!isInRating}>
        <div className={style.title}>
            Bewerten Sie die Besaitung
        </div>
        <div className={style.flutterRow}>
            <MyButton className={`${style.rateButton} ${rating  == 'bad'&& style.selected} `} onClick={()=>handelSelected('bad')} >
                <MyImage alt ='' src={badRate} className={`${style.rateImg} ${error&& style.error}`}/>
            </MyButton>
            <MyButton className={`${style.rateButton} ${rating == 'good'&& style.selected}`} onClick={()=>handelSelected('good')}>
                <MyImage alt ='' src={goodRate} className={`${style.rateImg} ${error&& style.error}`}/>
            </MyButton>
        </div>
        <Row className={style.buttonRow}>
            <MyButton className={style.button} mode='white' border onClick={handelClose}>
             Abbrechen
            </MyButton>
            <MyButton className={style.button} mode='black' onClick={handelRate}>
                Bewerten
            </MyButton>
        </Row>
    </FlutterMenu>
  )
}

export default RateMenu
