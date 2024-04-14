import React, { FC, useEffect, useState } from 'react'
import OrderFlutterMenu from '../OrderFlutterMenu/OrderFlutterMenu';
import OrderComment from '../OrderComment/OrderComment';
import SelectDateMenu from '../SelectDateMenu/SelectDateMenu';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';

import DropDownInput, { Option } from '../../../../UI/DropDownInput/DropDownInput';
import { ModelAndManufactureres } from '../../models/OrderModel';
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import style from './OnCourtRacketTesting.module.css';
import deleteItemIcon from '../../../../assets/images/deleteItemIcon.png'
import MyButton from '../../../../UI/MyButton/MyButton';
import MyImage from '../../../../UI/MyImage/MyImage';
import { CreateRecordType } from '../../../../models/IRecord';
import InputRow from '../../../../components/InputRow/InputRow';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../../../../app/router';
interface ModelManufacturereDefault{
  model: string, 
  manufactiors: string
}
interface SeelctedRacket{
  name: string,
  modelId: number,
}
const OnCourtRacketTesting:FC = () => {
  
    const {isDateBlockOpen,racketsManufactureres,racketsModels} = useTypedSelector(state=> state.order);
    const {userInfo} = useTypedSelector(state=> state.user);
    const {setIsOrderOpen,setIsDateBlockOpen,getRacketsWithManufactiors,createRecord} = useActions()
    const [orderBlockHidden, setOrderBlockHidden] = useState<boolean>(false);
    //====

    const [dateTime, setDateTime] = useState<Date>(new Date())
    const [comment, setComment] = useState<string>('')

    ///======================
    const [currentRacketModels, setCurrentRacketModels] = useState<ModelAndManufactureres[]>([]);
    const [modelManufacturereDefault, setModelManufacturereDefault] = useState<ModelManufacturereDefault>({
      model: 'Wählen Sie die Firma',
      manufactiors: 'Wählen Sie die Griffgröße'

    });
    const [selectedRackets, setSelectedRackets] = useState<SeelctedRacket[]>([]);
    //====
    useEffect(()=>{
      const effect = async() =>{
        await getRacketsWithManufactiors();
      }
      effect()
      
    },[])
    useEffect(()=>{

    },[])
    //===== helpers

    const formatOption = (arr: ModelAndManufactureres[]) =>{
      return arr.map(item => ({
        value: item.id,
        label: item.name
      }));
    }

    const getModelBuManufacuresId = (id: number) => {
        const models:ModelAndManufactureres[] =  racketsModels.filter((item)=>{
            return item.rocketManufacturerId == id;
        })
        const currentModels = models.filter(model => !selectedRackets.some(selected => selected.modelId === model.id));

        return currentModels;
    }
    const setPlaseholder = () =>{
      setTimeout(()=>{
        setModelManufacturereDefault({
          model: 'Wählen Sie die Firma',
          manufactiors: 'Wählen Sie die Griffgröße'
        })
      },20)
      setModelManufacturereDefault({
        model: '',
        manufactiors: ''
      })
    }
    //===== work with models and manufactiors
    const renderRacketModels = (manufactiorId:number ) =>{
      const models = getModelBuManufacuresId(manufactiorId)
      setCurrentRacketModels(models)
    }
    const deleteRacketFromList = (modelId:number) =>{
      setSelectedRackets(prev =>(
        prev.filter(racket =>{
          return racket.modelId !== modelId
        })
      ))
    }
    const addModelToList = (modelId:number)=>{
      setPlaseholder();
      const model = racketsModels.find(model => model.id == modelId) as ModelAndManufactureres
      const manufactior = racketsManufactureres.find(item => item.id == model.rocketManufacturerId) as ModelAndManufactureres
    
      const selectedRacket :SeelctedRacket = {
        modelId: modelId,
        name: manufactior.name + " " + model.name
      }
      setSelectedRackets(prev =>([...prev,selectedRacket]))

      setCurrentRacketModels([])
    }

    //====
    const {windowWidth}  = useTypedSelector(state=> state.adaptive);
    const navigate = useNavigate()
    const handelCloseOrderBlock = () =>{
      if(windowWidth <= 600){
        navigate(RouteNames.TERMINE)
    }
      setIsOrderOpen(false)
    }

    //===
    const handelTimeSelect = () =>{
      setOrderBlockHidden(true)
      setIsDateBlockOpen(true)
    }

    const handelSubmit = async()=>{
      
  
      const record:CreateRecordType = {
        recordType: 8,
        dateTime: dateTime,
        userComment: comment,
        userId: userInfo.userId,
        state: 1,
        testRackets: selectedRackets.map(racket =>{
          return racket.modelId
        })
      }

      setIsOrderOpen(false)
      await createRecord([record], userInfo.userId) 
    }
    const grifSize:Option[] =[
        {
            value: 1,
            label: '1'
        },
        {
            value: 2,
            label: '2'
        },
        {
            value: 3,
            label: '3'
        },
        {
            value: 4,
            label: '4'
        },
    ]
  return (
    <div>
        <OrderFlutterMenu title = {'On Court Tennisschläger - Test buchen'}
        onClose={handelCloseOrderBlock}
        onSubmit={handelTimeSelect}
        hidden ={orderBlockHidden}
        >
            <InputRow label='Hersteller' /* questionText ={questionText} questionMark questionTextClass = {style.questionTextClass} */>
                <DropDownInput
                    defaultValue={modelManufacturereDefault.manufactiors}
                    value={0}
                    options={formatOption(racketsManufactureres)}
                    onChange={(value: number) => renderRacketModels(value)}
                    className={style.button}
                />
            </InputRow>

            <InputRow label='Schlägermodell' /* questionText ={questionText} questionMark questionTextClass = {style.questionTextClass} */>
                <DropDownInput
                    defaultValue={modelManufacturereDefault.model}
                    value={0}
                    options={formatOption(currentRacketModels)}
                    onChange={(value: number) =>  addModelToList(value)}
                    className={style.button}
                />
            </InputRow>
          <GradientBlackBlock className={style.racketsBlock}>
            <div className={style.racketBlockTitle}>Ausgewählte Schläger:</div>
            <div className={style.racketsList}>
              {selectedRackets.map(racket =>
                <div className={style.racketItem}>
                  {racket.name}

                  <button className={style.deleteButton} onClick={ ()=> deleteRacketFromList(racket.modelId)}>
                      <img alt = '' src  ={deleteItemIcon}  className={style.deleteImage}/>
                  </button>
                </div>
              )}
            </div>
          </GradientBlackBlock>
        <OrderComment onChange={(value:string) => setComment(value)} value = {comment}/>
        </OrderFlutterMenu>
       
        {isDateBlockOpen&&
            <SelectDateMenu  recordType={2} onSelect={(value:Date)=>setDateTime(value)} onSubmit={handelSubmit} onClose={() => {setOrderBlockHidden(false);setIsDateBlockOpen(false)}}/>
        }
      
    </div>
  )
}
export default OnCourtRacketTesting
