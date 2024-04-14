import { IRacket } from "../../../../models/IRacket";
import { IString } from "../../../../models/IString";
import { BusyDateResponse } from "../../api/responces/BusyDateResponse";
import { ModelAndManufactureres, UserRackets } from "../../models/OrderModel";


export interface OrderState{
    isOpen: boolean;
    userRackets: UserRackets[],
    error:string,
    strings: IString[],
    isDateBlockOpen: boolean,
    busyDates: BusyDateResponse,
    isLoading: boolean,
    //==
    racketsModels: ModelAndManufactureres[],
    racketsManufactureres: ModelAndManufactureres[]
    //==
    recordTitle: string
}
export enum OrderActionEnum{
    SET_IS_OPEN = "SET_IS_ORDERING_OPEN",
    SET_USER_RACKETS = "SET_USER_RACKETS",
    SET_ERROR = "SET_ORDER_ERROR",
    SET_STRINGS = "SET_STRINGS",
    SET_IS_DATE_BLOCK_OPEN = "SET_IS_DATE_BLOCK_OPEN",
    SET_BUSY_DATE = "SET_BUSY_DATE",
    SET_IS_LOADING = "SET_IS_ORDERING_LOADING",
    SET_RACKETS_MODELS = "SET_RACKETS_MODELS",
    SET_MANUFACTURERES = "SET_MANUFACTURERES",
    SET_RECORD_TITLE = "SET_RECORD_TITLE"
}
export interface SetRecordTitleAction {
    type: OrderActionEnum.SET_RECORD_TITLE; 
    payload: string;
}


export interface SetIsOpenAction {
    type: OrderActionEnum.SET_IS_OPEN; 
    payload: boolean;
}

export interface SetUserRacketsAction {
    type: OrderActionEnum.SET_USER_RACKETS; 
    payload: UserRackets[];
}
export interface SetErrorAction {
    type: OrderActionEnum.SET_ERROR; 
    payload: string;
}
export interface SetStringsAction {
    type: OrderActionEnum.SET_STRINGS; 
    payload: IString[]
}

export interface SetIsDateBlockOpenAction {
    type: OrderActionEnum.SET_IS_DATE_BLOCK_OPEN; 
    payload: boolean
}

export interface SetBusyDateAction {
    type: OrderActionEnum.SET_BUSY_DATE;
    payload: BusyDateResponse
}

export interface SetIsOrderingLoadingAction {
    type: OrderActionEnum.SET_IS_LOADING;
    payload: boolean
}

export interface SetRacketsModels {
    type: OrderActionEnum.SET_RACKETS_MODELS;
    payload:  ModelAndManufactureres[]
}
export interface SetRacketsManufactureres {
    type: OrderActionEnum.SET_MANUFACTURERES;
    payload: ModelAndManufactureres[]
}


export type OrderAction = SetIsOpenAction |SetUserRacketsAction |SetErrorAction |SetStringsAction |SetIsDateBlockOpenAction|SetBusyDateAction|SetIsOrderingLoadingAction|
SetRacketsModels |SetRacketsManufactureres| SetRecordTitleAction;