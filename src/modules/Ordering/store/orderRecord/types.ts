
import { OrderPulling, OrderRecord, OrderTuning } from "../../models/OrderModel";



export interface PullingState{
    currentOrderRecord: number,
    orderRecords: OrderRecord[]
}

export enum OrderRecordActionEnum{
    SET_CURRENT_ORDER_RECORD = "SET_CURRENT_ORDER_RECORD",
    DELETE_ORDER_RECORDG = "DELETE_ORDER_RECORDG",
    ADD_ORDER_RECORD = "ADD_ORDER_RECORD",
    UPDATE_ORDER_RECORD = "UPDATE_ORDER_RECORD",
    SET_ORDER_RECORD = "SET_ORDER_RECORD"
}

//===
export interface DeleteOrderRecordAction{
    type: OrderRecordActionEnum.DELETE_ORDER_RECORDG; 
    payload: number;
}

export interface SetCurrentOrderRecordAction{
    type: OrderRecordActionEnum.SET_CURRENT_ORDER_RECORD; 
    payload: number;
}

export interface AddOrderRecordAction{
    type: OrderRecordActionEnum.ADD_ORDER_RECORD; 
    payload: OrderRecord;
}

export interface UpdateOrderRecordDto{ 
    id: number,
    orderRecordData: OrderRecord
}
export interface UpdateOrderRecordAction{
    type: OrderRecordActionEnum.UPDATE_ORDER_RECORD; 
    payload: UpdateOrderRecordDto
}


export interface SetOrderRecordAction{
    type: OrderRecordActionEnum.SET_ORDER_RECORD; 
    payload: OrderRecord[]
}
export type OrderRecordAction = SetOrderRecordAction| UpdateOrderRecordAction |AddOrderRecordAction |SetCurrentOrderRecordAction |DeleteOrderRecordAction;
