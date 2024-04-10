import { Pulling, PullingAction, PullingActionEnum, PullingState } from "./types";

const initialState:PullingState  = {
    pullings: [] as Pulling[],
    error: '',
    isLoaded: false,
    isInRating:false,
    ratingPullingId: 0
}

export default function(state =initialState,action:PullingAction ){
    switch(action.type){
        case PullingActionEnum.SET_PULLIGNS:
            return {...state, pullings:action.payload, isLoaded: true,error:'' }
            break;
        case PullingActionEnum.SET_ERROR:
            return {...state, error:action.payload ,isLoaded: true}
            break;
        case PullingActionEnum.SET_RATING:
            return {
                ...state,
                pullings: state.pullings.map(pulling =>
                    pulling.id === action.payload.pullingId
                        ? { ...pulling, feedback: action.payload.feedback }
                        : pulling
                )
            };
        case PullingActionEnum.SET_IS_LOADED:
            return {...state, isLoaded:action.payload }
        case PullingActionEnum.SET_IS_IN_RATING:
            return {...state, isInRating:action.payload }
        case PullingActionEnum.SET_Rating_Pulling_Id:
            return {...state, ratingPullingId:action.payload }
        default:
            return state;
        
    }
}