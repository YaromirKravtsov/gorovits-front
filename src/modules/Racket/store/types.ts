import { IRacket } from "../../../models/IRacket";


export interface RacketState {
    rackets: IRacket[],
    error: string,
    isLoading: boolean,

}

export enum RacketActionEnum {
    SET_RACKETS = "SET_RACKETS",
    SET_ERROR = "SET_ERROR",
    SET_IS_LOADING = "SET_IS_LOADING",
}

export interface SetRacketsAction{
    type: RacketActionEnum.SET_RACKETS,
    payload: IRacket[]
}


export interface SetErrorAction{
    type: RacketActionEnum.SET_ERROR,
    payload: string
}

export interface SetIsLoadingAction{
    type: RacketActionEnum.SET_IS_LOADING,
    payload: boolean
}


export type RacketAction = SetRacketsAction|
SetErrorAction| 
SetIsLoadingAction
