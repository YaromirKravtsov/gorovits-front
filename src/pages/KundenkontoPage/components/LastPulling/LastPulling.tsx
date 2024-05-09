import  { useEffect } from 'react'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu'
import style from './LastPulling.module.css'
import Row from '../../../../components/Layout/Row/Row'
import MyButton from '../../../../UI/MyButton/MyButton'
import { useNavigate } from 'react-router-dom'
import PullingStory from '../../../../modules/PullingStory/components/PullingStory/PullingStory'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import RateMenu from '../../../../modules/PullingStory/components/RateMenu/RateMenu'
const LastPulling = () => {
  const navigate = useNavigate();
  const { isEditing } = useTypedSelector(state => state.user)
  const { windowWidth } = useTypedSelector(state => state.adaptive)
  const handelGoToPullingHostory = () => {
    navigate('/besaitungen-des-benutzers')
  }
  useEffect(()=>{

  },[])
  return (
    <>
      <FlutterMenu shadow='small' className={`${style.flutterMenu} ${isEditing ? style.editShadow : ''}`}>
        <Row className={style.topRow}>
          <div className={style.title}>Deine letzte Besaitung</div>
          {windowWidth >= 600 &&
            <MyButton mode='black' className={style.button}
              onClick={() => handelGoToPullingHostory()}
              disabled={isEditing}
            >

              Story Bespannungen
            </MyButton>
          }
        </Row>
        
        <PullingStory type='last' />
        {windowWidth <= 600 &&
          <MyButton mode='black' className={style.button}
            onClick={() => handelGoToPullingHostory()}
            disabled={isEditing}
          >

            Story Bespannungen
          </MyButton>
        }
      </FlutterMenu>

      <RateMenu />
    </>
  )
}

export default LastPulling
