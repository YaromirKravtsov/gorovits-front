/* import { IShortUser } from "../../../models/IShortUser"; */
import { AuthAction, AuthActionsEmun, AuthState } from "./types";


const initialState:AuthState = {
    isAuth: false,
    isLoading: true,
    //======
    error:'',
    // other 

    //====
    recordsSearchParams: {
        string: '',
        state: 1
    }
}

export default function(state =initialState, action:AuthAction):AuthState{
    switch(action.type){
        case AuthActionsEmun.SET_AUTH:
            return {...state, isAuth:action.payload,isLoading:false}
        case AuthActionsEmun.SET_ERROR:
            return {...state, error:action.payload, isLoading:false}
        case AuthActionsEmun.SET_IS_LOADING:
            return {...state, isLoading:action.payload}
   
        case AuthActionsEmun.SET_RECORDS_SEARCH_PARAMS:
            return {...state, recordsSearchParams:action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}