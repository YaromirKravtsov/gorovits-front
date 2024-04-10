
import { AuthActionCreators } from "../../../app/state/auth/action-creators";
import { getErrorText } from "../../../helpers/FormDataGeneration";
import { IRacket } from "../../../models/IRacket";

import { AppDispatch } from "../../../store";
import { RacketService } from "../api/services/RacketService";
import { RacketActionEnum, SetErrorAction, SetIsLoadingAction, SetRacketsAction } from "./types";


export const RacketActionCreators = {
    setRackets:(rackets: IRacket[]): SetRacketsAction => ({type: RacketActionEnum.SET_RACKETS, payload: rackets}),
    setError:(error: string): SetErrorAction => ({type: RacketActionEnum.SET_ERROR, payload: error}),
    setIsLoading:(value: boolean): SetIsLoadingAction => ({type: RacketActionEnum.SET_IS_LOADING, payload: value}),
    fetchRackets: (userId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(RacketActionCreators.setIsLoading(true));
            const rackets = await RacketService.getRackets(userId);
            dispatch(RacketActionCreators.setRackets(rackets.data)); 
      
          
        } catch (error) {
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            dispatch(RacketActionCreators.setError((error as Error).message));
            dispatch(RacketActionCreators.setIsLoading(false));
        }finally {
            dispatch(RacketActionCreators.setIsLoading(false));
   
        }
    }
    

}