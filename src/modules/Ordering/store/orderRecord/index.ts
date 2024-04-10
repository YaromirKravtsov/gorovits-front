import {  OrderRecord } from "../../models/OrderModel";
import {  OrderRecordAction, OrderRecordActionEnum } from "./types";


const internalState = {
    currentOrderRecord: 0,
    orderRecords: [] as OrderRecord[]
}

export default function(state =internalState, action: OrderRecordAction ){
    switch(action.type){
        case OrderRecordActionEnum.SET_CURRENT_ORDER_RECORD:
            return {...state, currentOrderRecord: action.payload};
        case OrderRecordActionEnum.DELETE_ORDER_RECORDG:
            return {
                ...state,
                orderRecords: state.orderRecords.filter(orderRecord => orderRecord.id !== action.payload), 
            };
        case OrderRecordActionEnum.ADD_ORDER_RECORD:
            return {
                ...state,
                orderRecords: [...state.orderRecords, action.payload],
        };
        case OrderRecordActionEnum.SET_ORDER_RECORD:
            return {...state, orderRecords: action.payload}
        case OrderRecordActionEnum.UPDATE_ORDER_RECORD:
    return {
        ...state,
        orderRecords: state.orderRecords.map(orderRecord => {
            if (orderRecord.id === action.payload.id) {
                return {
                    ...orderRecord,
                    ...action.payload.orderRecordData
                };
            } else {
                return orderRecord;
            }
        })
    };

    default: 
        return {...state}
    }
}