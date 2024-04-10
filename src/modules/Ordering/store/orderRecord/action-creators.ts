import {  OrderRecord } from "../../models/OrderModel";
import { AddOrderRecordAction, DeleteOrderRecordAction, OrderRecordActionEnum, SetCurrentOrderRecordAction, SetOrderRecordAction, UpdateOrderRecordAction, UpdateOrderRecordDto } from "./types";

export const OrderRecordActionCreators = {
    setOrderRecords:(orderRecords:OrderRecord[]): SetOrderRecordAction => ({type: OrderRecordActionEnum.SET_ORDER_RECORD, payload: orderRecords}),
    addOrderRecord:(orderRecord:OrderRecord): AddOrderRecordAction => ({type: OrderRecordActionEnum.ADD_ORDER_RECORD, payload: orderRecord}),
    deleteOrderRecord:(id:number): DeleteOrderRecordAction => ({type: OrderRecordActionEnum.DELETE_ORDER_RECORDG, payload: id}),
    setCurrentOrderRecord:(id:number): SetCurrentOrderRecordAction => ({type: OrderRecordActionEnum.SET_CURRENT_ORDER_RECORD, payload: id}),
    updateOrderRecord:(updateOrderRecord:UpdateOrderRecordDto): UpdateOrderRecordAction => ({type: OrderRecordActionEnum.UPDATE_ORDER_RECORD, payload: updateOrderRecord}),
}