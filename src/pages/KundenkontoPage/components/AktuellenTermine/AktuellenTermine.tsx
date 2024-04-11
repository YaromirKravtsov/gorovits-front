import React, { FC } from 'react'
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock'
import style from './AktuellenTermine.module.css'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import BorderMenu from '../../../../UI/BorderMenu/BorderMenu';
import { GetAktuallenTermineResponse } from '../../api/responses/UserInfoResponse';

import MyButton from '../../../../UI/MyButton/MyButton';
import {  useNavigate } from 'react-router-dom';
import FormatDate from '../../../../helpers/dates';
import Record from '../../../../helpers/recordHelper';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';


interface Porps {
    aktuellenTermine: GetAktuallenTermineResponse[]
}
const AktuellenTermine:FC<Porps> = (props) => {
    const navigate = useNavigate();
    const {isEditing} = useTypedSelector(state => state.user);

  return (
    <FlutterMenu className={`${style.aktuellenTermine} ${isEditing ? style.editMode: ''}`} shadow='small' >
        <div className={style.title}>Deine aktuellen Termine</div>
        <div className={style.blocksRow} style ={{justifyContent:`${props.aktuellenTermine.length == 2 ? 'spaceBetween':'center'}`}}>
            {Object.keys(props.aktuellenTermine).length !== 0 ?
            <div className={style.terminsRow}>
            {props.aktuellenTermine.map((termin,index)=>(
                <GradientBlackBlock className={style.gradientBlock} key ={index}>
                    <BorderMenu className={style.dateTime}>
                        {FormatDate.SqlToDateTime(termin.dateTime)}
                    </BorderMenu>
                    <BorderMenu className={style.recordType}>
                        {Record.insertSpaceIfNeeded(Record.getNameByRecordType(termin?.recordType),10)}
                    </BorderMenu>
                </GradientBlackBlock>
            ))}
            </div>
            :
            <>
                <div className={style.noRecordText}>Keine aktuellen Termine vorhanden</div>
                <MyButton mode='black' onClick={()=>navigate('/termine')} className={style.noRecordButton}>
                    Zur Termine
                </MyButton>
            </>
            }
     
        </div>
       
    </FlutterMenu>
  )
}

export default AktuellenTermine
