import { IRacket } from "../../../models/IRacket";
import { RacketAction, RacketActionEnum, RacketState } from "./types";

const internalState:RacketState = {
    rackets: [] as IRacket[],
    error:'',
    isLoading: true,

}

export default function(state = internalState, action:RacketAction){
    switch(action.type){
        case RacketActionEnum.SET_RACKETS:
            return {...state, rackets: action.payload}
        case RacketActionEnum.SET_ERROR:
            return {...state, error: action.payload}
        case RacketActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default: 
            return {...state}
    }
}