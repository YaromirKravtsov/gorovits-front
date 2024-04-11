
import React,{ FC, useState } from 'react';
import style from './RacketsList.module.css';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import RecordHeler from '../../../../helpers/recordHelper';
import MyButton from '../../../../UI/MyButton/MyButton';
import editRacketIcon from '../../../../assets/images/Edit-racket-icon.png';
import deleteRacketIcon from '../../../../assets/images/delete-racket-icon.png';
import { useActions } from '../../../../hooks/useActions';
import AddRacketMenu from '../AddRacketMenu/AddRacketMenu';
import { INewRacket } from '../../../../models/INewRackets';
import $api from '../../../../app/api/http';
import { NewRacketsService } from '../../api/NewRacketsService';
import { getErrorText } from '../../../../helpers/FormDataGeneration';
import InfoFlutter from '../../../../UI/InfoFlutter/InfoFlutter';
import QRCode from 'qrcode.react';
import QRCodeGenerator from '../../../../components/QRCodeGenerator/QRCodeGenerator';
interface Props{
  editMode: boolean,
}
const RacketsList:FC<Props> = (props) => {
    const {newRackets} = useTypedSelector(state=> state.newRackets);
    const {setGlobalError} = useActions();
    const {deleteNewRacket} = useActions()
    const [isNewRacketOpen, setIsNewRacketOpen] = useState<boolean>(false)

    const [currentRacket,setCurrentRacket] = useState<INewRacket>();
    const [isError, setIsError] =  useState<boolean>();

    const fetchDeleteRacket =async (id:number) =>{
      try{
        await NewRacketsService.deleteRacket(id)
        deleteNewRacket(id);
       }catch(e){
         console.log(e)
         setGlobalError(getErrorText(e))
       }
    }
    const deleteRacket = async () =>{
      const id = currentRacket?.id as number;
      if(props.editMode){
        setIsError(true)
        
      }else{
        deleteNewRacket(id);
      }

    }

    const qrCodeValue = 'Ваша строка для генерации QR-кода';

 
  return (

    <div className={style.list}>
    
      {newRackets.map((racket,index)=>
        <GradientBlackBlock className={`${style.item} ${props.editMode ? style.editItem :''}`} key ={index}>
          <div className={style.mainRow}>
            <div className={style.contentBlock}>
                <div className={style.contentTitle}>Schläger Nr. {racket.number} <br /> <div className={style.racketCode}>{racket.code} </div> </div>
                <div className={style.contentLine}></div>
                <div className={style.contentText}>{racket.racketModelName}</div>
            </div>
            <div className={style.contentBlock}>
                <div className={style.contentTitle}>Seiten</div>
                <div className={style.contentLine}></div>
                <div className={style.contentText}>{RecordHeler.formatStringsName(racket.longString.name, racket.crossString.name)}</div> 
            </div>
            <div className={style.contentBlock}>
                <div className={style.contentTitle}>Besaitungshärte</div>
                <div className={style.contentLine}></div>
                <div className={style.contentText}> {RecordHeler.formatStringHardnes(racket.stringHardness) }</div> 
            </div>
            <div className={style.contentBlock}>
                <div className={style.contentTitle}>Tuning</div>
                <div className={style.contentLine}></div>
                <div className={style.contentText}> 
                
                {
                  RecordHeler.renderTuningData(
                    {swingWeight: racket.swingWeight, 
                      balancePoint: racket.balancePoint,
                      totalWeight: racket.totalWeight
                    }).map((el,index)=>
                    <div key ={index}>{el} </div>
                  )
                }
                </div> 
            </div>
          </div>
          <div className={style.buttonsRow} >
            {props.editMode&&
            <QRCodeGenerator value={racket.code} className={`${style.button}`}/>
            }
            

            <MyButton className={`${style.button} ${style.edit}`} onClick={()=>{
              setCurrentRacket(racket)
              setIsNewRacketOpen(true)}}>
              <img src={editRacketIcon} alt="edit racket icon" className={style.buttonImg}/>
            </MyButton>
            <MyButton className={`${style.button} ${style.delete}`} onClick={()=> {setCurrentRacket(racket); deleteRacket()}}>
              <img src={deleteRacketIcon} alt="edit racket icon" className={style.buttonImg}/>
            </MyButton>
          </div>
              
        </GradientBlackBlock>
         
     
      )}
      
      {isNewRacketOpen &&
            <>
         
              <AddRacketMenu onOpenChange={setIsNewRacketOpen} racket={currentRacket} editMode = {props.editMode}/>
            </>
          }
  {isError &&
     <InfoFlutter onisOpen={setIsError}title='Bestätigung erforderlich'  text='Sind Sie sicher, dass Sie diesen Schläger des Benutzers löschen möchten?'
     
     onCLick={()=>fetchDeleteRacket(currentRacket?.id as number)}/> 
    }
    
    </div>
  )
}

export default RacketsList
