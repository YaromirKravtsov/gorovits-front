import { INewRacket } from "../../../../models/INewRackets";

export interface NewRackets {
    newRackets: INewRacket[],
    
}

export enum NewRacketsActionEnum {
    ADD_NEW_RACKET = "ADD_NEW_RACKET",
    DELETE_NEW_RACKET = "DELETE_NEW_RACKET",
    SET_NEW_RACKETS = "SET_NEW_RACKETS",
    UPDATE_NEW_RACKET = "UPDATE_NEW_RACKET"
}

export interface AddNewRacketAction{
    type: NewRacketsActionEnum.ADD_NEW_RACKET,
    payload: INewRacket
}

export interface DeleteNewRacketAction{
    type: NewRacketsActionEnum.DELETE_NEW_RACKET,
    payload: number,
}

export interface SetNewRacketsAction{
    type: NewRacketsActionEnum.SET_NEW_RACKETS,
    payload: INewRacket[],
}




export interface UpdateNewRacketsAction{
    type: NewRacketsActionEnum.UPDATE_NEW_RACKET,
    payload: INewRacket
}

export type NewRacketActions = AddNewRacketAction | DeleteNewRacketAction |
SetNewRacketsAction | UpdateNewRacketsAction;