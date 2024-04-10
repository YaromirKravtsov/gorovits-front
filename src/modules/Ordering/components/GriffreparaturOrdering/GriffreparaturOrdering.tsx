import { FC, useEffect, useState } from 'react';

import OderInput from '../../../../components/MyInput/MyInput';

import { useActions } from '../../../../hooks/useActions';
import OrderComment from '../OrderComment/OrderComment';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { CreatePullingDto, CreateRecordDto, CreateTuningDto } from '../../../../models/IRecord';
import { OrderGriffreparatur, OrderPulling, OrderRecord, OrderTuning } from '../../models/OrderModel';
import OrderMenuWithRackets from '../OrderMenuWithRackets/OrderMenuWithRackets';
import { OrderGriffreparaturErrors, OrderRecordErrors } from '../../models/OrderRecordErrors';
import DropDownInput, { Option } from '../../../../UI/DropDownInput/DropDownInput';
import style from './GriffreparaturOrdering.module.css'
import InputRow from '../../../../components/InputRow/InputRow';
const GriffreparaturOrdering:FC = () => {

    // in redux state, actions
    const {userInfo} = useTypedSelector(state=> state.user)
    const {orderRecords} = useTypedSelector(state=> state.orderRecord);
    const {createRecord} = useActions();
    //===

    const [orderRecordData, setRecordData] = useState<OrderRecord>({
        id: 0,
        racketId: 0,
        handleSize:0,
        comment: ''
    })
    const [dateTime,setDateTime] = useState<Date>(new Date())
    // in sattes
    const [inputsErrors,setInputsErrors] = useState<OrderRecordErrors>({
        racketId: false,
        handleSize: false
    })
    //========= Record Info
    //=== funcs
    const inputsValidate = () => {
        let errors: OrderRecordErrors = {
            racketId: (orderRecordData.racketId === -1 || orderRecordData.racketId === 0),
            handleSize: (orderRecordData as OrderGriffreparatur).handleSize === 0,
            
        };
        setInputsErrors(errors);
        console.log(errors)
        if (!errors.racketId && !errors.handleSize) {
            return true;
         } 

    
        return false;
    }
    
     const createPullingRecord = async () =>{
      
        const pullingsCreateData: CreateTuningDto[] = orderRecords.map((record: OrderRecord) => {
        const griffreparatur = record as OrderGriffreparatur;
        return {
            handleSize: griffreparatur.handleSize,
            userRacketId: griffreparatur.racketId,
            recordId: griffreparatur.id,
            recordType: 4,
            dateTime: dateTime,
            userComment: orderRecordData.comment,
            userId: userInfo.userId,
            state: 1,
        };
        })
         
        await createRecord(pullingsCreateData, userInfo.userId);
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
        <>
        <OrderMenuWithRackets title = 'Griffreparatur' createRecord={createPullingRecord} setRecordData = {(data: OrderRecord)=> setRecordData(data)} 
        setDateTime = {(data: Date) => setDateTime(data)} 
        recordData ={orderRecordData} 
        inputsValidate ={inputsValidate} 
        inputsErrors = {inputsErrors}
        setInputsErrors = { (errors: OrderRecordErrors) => setInputsErrors(errors)}
        >
            <InputRow label='Balancepunkt'>
            <DropDownInput
                defaultValue='Wählen Sie die Griffgröße' 
                value={1}
                options={grifSize}
                onChange={(value: number) => { setInputsErrors(prev => ({...prev, handleSize: false})); setRecordData(prev => ({...prev, handleSize:value })) }}
             
            />
             {(inputsErrors as OrderGriffreparaturErrors).handleSize &&
                <span className={style.errorInput}>Das Feld muss ausgefüllt werden </span>
            }
            </InputRow>
            
            <OrderComment onChange={(value:string) => setRecordData(prev=> ({...prev, comment: value}))} value = {orderRecordData.comment}/>
        </OrderMenuWithRackets>
        </>
    );
};


export default GriffreparaturOrdering
