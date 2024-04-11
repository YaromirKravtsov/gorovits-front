import { FC, useEffect, useState } from 'react';

import OderInput from '../../../../components/MyInput/MyInput';

import { useActions } from '../../../../hooks/useActions';
import OrderComment from '../OrderComment/OrderComment';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import {  CreateTuningDto } from '../../../../models/IRecord';
import {  OrderRecord, OrderTuning } from '../../models/OrderModel';
import OrderMenuWithRackets from '../OrderMenuWithRackets/OrderMenuWithRackets';
import { OrderRecordErrors, OrderTuningssErrors } from '../../models/OrderRecordErrors';
import style from './TunningOrdering.module.css';
import InputRow from '../../../../components/InputRow/InputRow';

const TunningOrdering: FC = () => {

    // in redux state, actions
    const {userInfo} = useTypedSelector(state=> state.user)
    const {orderRecords} = useTypedSelector(state=> state.orderRecord);
    const {createRecord} = useActions();
    //===

    const [orderRecordData, setRecordData] = useState<OrderRecord>({
        id: 0,
        racketId: 0,
        balancePoint:'',
        totalWeight:'',
        swingWeight:'',
        comment: ''
    })
    const [dateTime,setDateTime] = useState<Date>(new Date())
    // in sattes
    const [inputsErrors,setInputsErrors] = useState<OrderRecordErrors>({
        racketId: false,
        balancePoint:false,
        totalWeight:false,
        swingWeight:false,
    })
    //========= Record Info
    //=== funcs
    const inputsValidate = () => {
        let errors: OrderRecordErrors = {
            racketId: (orderRecordData.racketId === -1 || orderRecordData.racketId === 0),
            balancePoint: !(orderRecordData as OrderTuning).balancePoint.trim(),
            totalWeight: !(orderRecordData as OrderTuning).totalWeight.trim(),
            swingWeight: !(orderRecordData as OrderTuning).swingWeight.trim(),
        };
    
        // Проверяем, заполнено ли хотя бы одно из полей
        const atLeastOneFieldFilled = Object.entries(errors).some(([key, value]) => key !== 'racketId' && !value);

    
        // Если хотя бы одно поле заполнено, сбрасываем ошибки для них
        if (atLeastOneFieldFilled) {
            errors.balancePoint = false;
            errors.totalWeight = false;
            errors.swingWeight = false;
        } else {
            // Если все поля пустые, устанавливаем ошибки для всех полей
            errors.balancePoint = true;
            errors.totalWeight = true;
            errors.swingWeight = true;
        }
    
        setInputsErrors(errors);
    
        // Если нет ошибок, возвращаем true
        return !errors.racketId && !errors.balancePoint && !errors.totalWeight && !errors.swingWeight;
    }
    
     const createPullingRecord = async () =>{
      
        const pullingsCreateData: CreateTuningDto[] = orderRecords.map((record: OrderRecord) => {
        const tuning = record as OrderTuning;
        return {
            balancePoint: tuning.balancePoint,
            totalWeight:tuning.totalWeight,
            swingWeight:tuning.swingWeight,
            userRacketId: tuning.racketId,
            recordId: tuning.id,
            recordType: 2,
            dateTime: dateTime,
            userComment: orderRecordData.comment,
            userId: userInfo.userId,
            state: 1,
        };
        })
         
        await createRecord(pullingsCreateData, userInfo.userId);
    } 
    const questionText = 'Bitte füllen Sie mindestens eines der Tuning-Charakteristikfelder aus: Balancepunkt, Gesamtgewicht oder Schwunggewicht. Wenn Sie möchten, können Sie auch eine "Werkstattempfehlung" angeben, um Hilfe vor Ort zu erhalten.'

    return (
        <>
        <OrderMenuWithRackets title = 'Tuning' createRecord={createPullingRecord} setRecordData = {(data: OrderRecord)=> setRecordData(data)} 
        setDateTime = {(data: Date) => setDateTime(data)} 
        recordData ={orderRecordData} 
        inputsValidate ={inputsValidate} 
        inputsErrors = {inputsErrors}
        setInputsErrors = { (errors: OrderRecordErrors) => setInputsErrors(errors)}
        >
            <InputRow label='Balancepunkt' questionText ={questionText} questionMark questionTextClass = {style.questionTextClass}>
                <OderInput
                    onChange={(value: string) => setRecordData(prev=> ({...prev, balancePoint: value}))}
                    placeholder='Balance eingeben'
                    error ={(inputsErrors as OrderTuningssErrors).balancePoint}
                    setError = {(value: boolean) => setInputsErrors({...inputsErrors,balancePoint: value })}
                    value ={(orderRecordData as OrderTuning).balancePoint}
                    className='order_input'
                />
            </InputRow>
            <InputRow label='Gesamtgewicht' questionText ={questionText} questionMark questionTextClass = {style.questionTextClass}>
                <OderInput
                    onChange={(value: string) => setRecordData(prev=> ({...prev, totalWeight: value}))}
                    placeholder='Gesamtgewicht eingeben'
                    error ={(inputsErrors as OrderTuningssErrors).totalWeight}
                    setError = {(value: boolean) => setInputsErrors({...inputsErrors,totalWeight: value })}
                    value ={(orderRecordData as OrderTuning).totalWeight}
                    className='order_input'
                />
            </InputRow>
            <InputRow label='Schwunggewicht' questionText ={questionText} questionMark questionTextClass = {style.questionTextClass}>
                <OderInput
                    onChange={(value: string) => setRecordData(prev=> ({...prev, swingWeight: value}))}
                    placeholder='Swingweight eingeben'
                    error ={(inputsErrors as OrderTuningssErrors).swingWeight}
                    setError = {(value: boolean) => setInputsErrors({...inputsErrors,swingWeight: value })}
                    value ={(orderRecordData as OrderTuning).swingWeight}
                    className='order_input'
                />
            </InputRow>
            <OrderComment onChange={(value:string) => setRecordData(prev=> ({...prev, comment: value}))} value = {orderRecordData.comment}/>
        </OrderMenuWithRackets>
        </>
    );
};

export default TunningOrdering