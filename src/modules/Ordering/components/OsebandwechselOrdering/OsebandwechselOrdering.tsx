
import { FC, useEffect, useState } from 'react';
import { useActions } from '../../../../hooks/useActions';
import OrderComment from '../OrderComment/OrderComment';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { CreateOsebandwechselgDto, CreatePullingDto, CreateRecordDto, CreateTuningDto } from '../../../../models/IRecord';
import { OrderOsebandwechsel, OrderPulling, OrderRecord, OrderTuning } from '../../models/OrderModel';
import OrderMenuWithRackets from '../OrderMenuWithRackets/OrderMenuWithRackets';
import { OrderRecordErrors } from '../../models/OrderRecordErrors';


const OsebandwechselOrdering:FC = () => {
   
    // in redux state, actions
    const {userInfo} = useTypedSelector(state=> state.user)
    const {orderRecords} = useTypedSelector(state=> state.orderRecord);
    const {createRecord} = useActions();
    //===

    const [orderRecordData, setRecordData] = useState<OrderRecord>({
        id: 0,
        racketId: 0,
        comment: ''
    })
    const [dateTime,setDateTime] = useState<Date>(new Date())
    // in sattes
    const [inputsErrors,setInputsErrors] = useState<OrderRecordErrors>({
        racketId: false,
    })
    //========= Record Info
    //=== funcs
    const inputsValidate = () => {
        let errors: OrderRecordErrors = {
            racketId: (orderRecordData.racketId === -1 || orderRecordData.racketId === 0),
        };
    
       

        setInputsErrors(errors);
        if (!errors.racketId ) {
            return true;
         } 
         return false;
    
     
    
    }
    
     const createPullingRecord = async () =>{
      
        const pullingsCreateData: CreateOsebandwechselgDto[] = orderRecords.map((record: OrderRecord) => {
        const osen = record as OrderOsebandwechsel;
        return {
            userRacketId: osen.racketId,
            recordId: osen.id,
            recordType: 3,
            dateTime: dateTime,
            userComment: osen.comment,
            userId: userInfo.userId,
            state: 1,
        };
        })
         
        await createRecord(pullingsCreateData, userInfo.userId);
    } 

    return (
        <>
        <OrderMenuWithRackets title = 'Ösebandwechsel' createRecord={createPullingRecord} setRecordData = {(data: OrderRecord)=> setRecordData(data)} 
        setDateTime = {(data: Date) => setDateTime(data)} 
        recordData ={orderRecordData} 
        inputsValidate ={inputsValidate} 
        inputsErrors = {inputsErrors}
        setInputsErrors = { (errors: OrderRecordErrors) => setInputsErrors(errors)}
        >
          
            <OrderComment onChange={(value:string) => setRecordData(prev=> ({...prev, comment: value}))} value = {orderRecordData.comment}/>
        </OrderMenuWithRackets>
        </>
    ); 
}

export default OsebandwechselOrdering
