
import { IString } from "../../../../models/IString";
import { BusyDateResponse } from "../../api/responces/BusyDateResponse";
import { ModelAndManufactureres, UserRackets } from "../../models/OrderModel";

import { OrderAction, OrderActionEnum, OrderState } from "./types";

const internalState:OrderState = {
    isOpen: false,
    isLoading: true,
    error: '',
    strings: [] as IString[],
    isDateBlockOpen: false,
    busyDates: {} as BusyDateResponse,

    //===
    userRackets: [] as UserRackets[],
    //==
    racketsModels: [] as ModelAndManufactureres[],
    racketsManufactureres:[] as ModelAndManufactureres[],
    //==
    recordTitle: ''
}

export default function(state =internalState, action: OrderAction ){
    switch(action.type){
        case OrderActionEnum.SET_IS_OPEN:
            return {...state, isOpen: action.payload }
        case OrderActionEnum.SET_USER_RACKETS:
            return {...state, userRackets: action.payload }
        case OrderActionEnum.SET_ERROR:
            return {
                ...state,
                error: action.payload, // payload должен быть строкой с сообщением об ошибке
                isLoading: false, // Сброс isLoading в случае ошибки
              };
        case OrderActionEnum.SET_STRINGS:
            return {...state, strings: action.payload }
        case OrderActionEnum.SET_IS_DATE_BLOCK_OPEN:
            return {
                ...state,
                isDateBlockOpen: action.payload, 
              };
        case OrderActionEnum.SET_BUSY_DATE:
            return {...state, busyDates: action.payload,
                isLoading: false, // Здесь вы можете сбросить isLoading
            }
        case OrderActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload }
        //=================
        case OrderActionEnum.SET_MANUFACTURERES:
            return {...state, racketsManufactureres: action.payload }
        case OrderActionEnum.SET_RACKETS_MODELS:
            return {...state, racketsModels: action.payload }
            case OrderActionEnum.SET_RECORD_TITLE:
                return {...state, recordTitle: action.payload }
        default: 
            return {...state}
    }
}