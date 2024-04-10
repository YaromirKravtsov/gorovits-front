import { INewRacket } from "../../../../models/INewRackets";
import { AddNewRacketAction, DeleteNewRacketAction, NewRacketsActionEnum, SetNewRacketsAction, UpdateNewRacketsAction } from "./type";

export const NewRacketsActionCreators = {
    setNewRackets:(rackets: INewRacket[]): SetNewRacketsAction => ({type: NewRacketsActionEnum.SET_NEW_RACKETS, payload: rackets}),
    addNewRacket:(racket: INewRacket): AddNewRacketAction => ({type: NewRacketsActionEnum.ADD_NEW_RACKET, payload: racket}),
    updateNewRacket:(UpdatePayload: INewRacket): UpdateNewRacketsAction => ({type: NewRacketsActionEnum.UPDATE_NEW_RACKET, payload: UpdatePayload}),
    deleteNewRacket:(id: number): DeleteNewRacketAction => ({type: NewRacketsActionEnum.DELETE_NEW_RACKET, payload: id}),
}