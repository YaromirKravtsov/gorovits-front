//OrderMenuWithRackets
import React,{ FC, ReactNode, useEffect, useState } from 'react';
import RacketsDropBlock from '../RacketsDropBlock/RacketsDropBlock';

import OderInput from '../../../../components/MyInput/MyInput';

import MyButton from '../../../../UI/MyButton/MyButton';
import OrderFlutterMenu from '../OrderFlutterMenu/OrderFlutterMenu';
import style from './OrderMenuWithRackets.module.css'
import { useActions } from '../../../../hooks/useActions';
import OrderComment from '../OrderComment/OrderComment';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import SelectDateMenu from '../SelectDateMenu/SelectDateMenu';
import {  OrderRecord } from '../../models/OrderModel';
import { pullingOrderTitle } from '../../constants/PullingOrderTitle';
import { OrderHelper } from '../../helpers/OrderHelper';
import { UserRackets } from '../../models/OrderModel';
import { OrderRecordErrors } from '../../models/OrderRecordErrors';

interface Props{
    createRecord: () => void,
    setRecordData: (data: OrderRecord) => void,
    setDateTime: (dateTime:Date) => void,
    recordData: OrderRecord,
    inputsValidate: ()=>boolean,
    children: ReactNode,
    //===
    inputsErrors: OrderRecordErrors
    setInputsErrors: (errors: OrderRecordErrors) => void
    title: string
}
const OrderMenuWithRackets: FC<Props> = (props) => {

    // in redux state, actions
    const {isDateBlockOpen,userRackets} = useTypedSelector(state=> state.order)
    const {userInfo} = useTypedSelector(state=> state.user)
    const {orderRecords, currentOrderRecord} = useTypedSelector(state=> state.orderRecord);
    const {addOrderRecord, setOrderRecords} = useActions();
    const {setCurrentOrderRecord,updateOrderRecord} = useActions();
    //
    const {setIsDateBlockOpen,setIsOrderOpen,getStrings,getUsersRackets/* setUserOrderRackets */} = useActions()
    //===
    // in sattes
    const [userRacketsCurrent, setUserRacketsCurrent] = useState<UserRackets[]>(userRackets as UserRackets[]);

    const [blockHidden, setBlockHidden] = useState<boolean>(false);

  
    //== actions
    useEffect(() => {
        const fetchData = async () => {
          await getStrings();
          await getUsersRackets(userInfo.userId);
        };
        fetchData()
      }, []);

       useEffect(() => {
        setUserRacketsCurrent(OrderHelper.getUserRackets(userRackets,orderRecords));
      }, [userRackets, currentOrderRecord]);

      useEffect(() => {
        if (orderRecords[currentOrderRecord]) {
            props.setRecordData(orderRecords[currentOrderRecord] as OrderRecord);

        }
    }, [currentOrderRecord, orderRecords]);
    
    //=== funcs
   
  const updateInformation = async () => {
        const updatedPullingData = { ...(props.recordData), id: currentOrderRecord};

        props.setRecordData(updatedPullingData);
        if (OrderHelper.checkIfRecordExists(currentOrderRecord, orderRecords)) {
            updateOrderRecord({ id: currentOrderRecord, orderRecordData: updatedPullingData });
        } else {
            addOrderRecord(updatedPullingData);
        
        }
    };
    const [nextClickExecuted, setNextClickExecuted] = useState(false);

    useEffect(()=>{
        if(!OrderHelper.checkIfRecordExists(currentOrderRecord, orderRecords)){
            setTimeout(()=>{
                props.setRecordData({ ...(props.recordData), racketId: -1});
            },1)
            props.setRecordData({ ...(props.recordData), racketId: 0});
        }
    },[nextClickExecuted]);

    const handleNextClick = async() => {
        if (props.inputsValidate()) {
            setCurrentOrderRecord(currentOrderRecord + 1); 
            await updateInformation().then(()=>{
                setNextClickExecuted(!nextClickExecuted)
            });
        }
    };

    const prevRacket = () => {
      if (props.inputsValidate()) {
            setCurrentOrderRecord(currentOrderRecord - 1); // Уменьшаем значение до обновления
            updateInformation();
        }
    };
    const handelChooseTime  = async() => {
        if (props.inputsValidate()) {
            await updateInformation().then(()=>{
                setNextClickExecuted(!nextClickExecuted)
            });
            setIsDateBlockOpen(true);
            setBlockHidden(true)
        }
    }
    const handelPullingClose = () =>{
        setIsOrderOpen(false);
        setOrderRecords([]);
        setCurrentOrderRecord(0)
        setBlockHidden  (false)
    }
     const createOrderRecord = async () =>{
        setIsOrderOpen(false)
        setIsDateBlockOpen(false)
        props.createRecord()
        setOrderRecords([]);
    } 

    return (
        <>
        <OrderFlutterMenu title= {props.title+ pullingOrderTitle[currentOrderRecord]} onSubmit={handelChooseTime} hidden = {blockHidden} onClose={handelPullingClose}>
            <RacketsDropBlock onChange={(value: number) => props.setRecordData({...(props.recordData), racketId: value})} error = {props.inputsErrors.racketId}
                defaultValue={'Wählen Sie einen Schläger'}
                setError = {(value: boolean) => props.setInputsErrors({...props.inputsErrors,racketId: value })}
                value ={props.recordData.racketId}
                userRackets={userRacketsCurrent}
            />
            {props.children}
            {/* =============Buttons============== */}
            {currentOrderRecord > 0?
            <MyButton className={style.button} mode='white' border onClick={prevRacket}>Zur vorherigen Schläger</MyButton>
            : <div></div>
            } 
           {userRackets.length-1 > currentOrderRecord&&
            <MyButton className={style.button} mode='black' onClick={handleNextClick}>Weitere Schläger hinzufügen</MyButton>
           }
            
        </OrderFlutterMenu>
            {
            isDateBlockOpen&&
            <SelectDateMenu  recordType={1} onSelect={(value:Date)=>props.setDateTime(value)} onSubmit={createOrderRecord} onClose={() => setBlockHidden(false)}/>
          }
        </>
    );
};

export default OrderMenuWithRackets;
