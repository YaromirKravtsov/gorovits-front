import React, { useEffect, useState } from 'react'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu'
import style from './LastPulling.module.css'
import Row from '../../../../components/Layout/Row/Row'
import MyButton from '../../../../UI/MyButton/MyButton'
import { useNavigate } from 'react-router-dom'
import PullingStory from '../../../../modules/PullingStory/components/PullingStory/PullingStory'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import RateMenu from '../../../../modules/PullingStory/components/RateMenu/RateMenu'
const LastPulling = () => {
    const navigate = useNavigate();
    const {isEditing} = useTypedSelector(state => state.user) 
    const handelGoToPullingHostory = () =>{
      navigate('/besaitungen-des-benutzers')
    }
    
  return (
    <>
    <FlutterMenu shadow='small' className={`${style.flutterMenu} ${isEditing ?style.editShadow: '' }`}>
        <Row className={style.topRow}>
            <div className={style.title}>Deine letzte Besaitung</div>
            <MyButton mode='black' className={style.button} 
              onClick={()=>handelGoToPullingHostory()}
              disabled = {isEditing}
            >
             Story Bespannungen
            </MyButton>
        </Row>
        <PullingStory type = 'last'/>
    </FlutterMenu>
    <RateMenu/>
</>
  )
}

export default LastPulling
