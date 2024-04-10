import { MainServise } from "../../../../api/services/MainService";
import $api from "../../../../app/api/http";
import { IString } from "../../../../models/IString";
import { AppDispatch } from "../../../../store";
import { BusyDateResponse } from "../../api/responces/BusyDateResponse";
import BusyDateService from "../../api/services/BusyDateService";
import { OrderServise } from "../../api/services/OderingService";
import { ModelAndManufactureres, UserRackets } from "../../models/OrderModel";

import { OrderActionEnum, SetBusyDateAction, SetErrorAction, SetIsOrderingLoadingAction, SetIsOpenAction, SetStringsAction, SetUserRacketsAction, SetIsDateBlockOpenAction, SetRacketsModels, SetRacketsManufactureres } from "./types";


export const OrderActionCreators  ={
    setIsOrderOpen:(value:boolean): SetIsOpenAction => ({type: OrderActionEnum.SET_IS_OPEN, payload: value}),
    setUserOrderRackets:(userRackets :UserRackets[]): SetUserRacketsAction => ({type: OrderActionEnum.SET_USER_RACKETS, payload: userRackets}),
    setError:(error:string): SetErrorAction => ({type: OrderActionEnum.SET_ERROR, payload: error}),
    setStrings:(strings:IString[]): SetStringsAction => ({type: OrderActionEnum.SET_STRINGS, payload: strings}),
    setIsDateBlockOpen:(value:boolean): SetIsDateBlockOpenAction => ({type: OrderActionEnum.SET_IS_DATE_BLOCK_OPEN, payload: value}),
    setBusyDatesSelect:(dates:BusyDateResponse): SetBusyDateAction => ({type: OrderActionEnum.SET_BUSY_DATE, payload: dates}),
    setIsLoadingSelect:(value:boolean): SetIsOrderingLoadingAction => ({type: OrderActionEnum.SET_IS_LOADING, payload: value}),
    getUsersRackets: (userId:number) => async (dispatch: AppDispatch) =>{
        try{
            const {data} = await OrderServise.getRackets(userId);
            dispatch(OrderActionCreators.setUserOrderRackets(data))
       
        }catch(error){
            console.log(error);
            dispatch(OrderActionCreators.setError((error as Error).message));
        }finally{

        }
    },
    getStrings: () => async (dispatch: AppDispatch) =>{
        try{
            const {data} = await OrderServise.getStrins();
     
            dispatch(OrderActionCreators.setStrings(data))
       
        }catch(error){
            console.log(error);
            dispatch(OrderActionCreators.setError((error as Error).message));
        }
    },
    getBusyDates: (recordType:number) => async (dispatch: AppDispatch) =>{
        dispatch(OrderActionCreators.setIsLoadingSelect(true))
        try{
            const {data} = await BusyDateService.getBusyDates(recordType);
            dispatch(OrderActionCreators.setBusyDatesSelect(data));

        }catch(error){
            console.log(error);
            dispatch(OrderActionCreators.setError((error as Error).message));
        }
    },
    setRacketsModels:(rackets:ModelAndManufactureres[]): SetRacketsModels => ({type: OrderActionEnum.SET_RACKETS_MODELS, payload: rackets}),
    setRacketsManufactior:(manufactiors: ModelAndManufactureres[]): SetRacketsManufactureres => ({type: OrderActionEnum.SET_MANUFACTURERES, payload: manufactiors}),
    getRacketsWithManufactiors: () => async (dispatch: AppDispatch) =>{
        const manufactiors = await MainServise.getRacketsManufactureres();
   
        dispatch(OrderActionCreators.setRacketsManufactior(manufactiors.data))
        const models = await MainServise.getRacketsModels();
        dispatch(OrderActionCreators.setRacketsModels(models.data));
        
        
    }
}