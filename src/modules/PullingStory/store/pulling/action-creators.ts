import $api from "../../../../app/api/http";
import { AuthActionCreators } from "../../../../app/state/auth/action-creators";
import { getErrorText } from "../../../../helpers/FormDataGeneration";
import { AppDispatch } from "../../../../store";
import { PulligService } from "../../api/services/pullingService";

import { Pulling, PullingActionEnum, PullingRating, SetErrorAction, SetIsInRatingAction, SetIsLoadedPullingAction, SetPullingsAction, SetRatingAction, SetRatingPullingIdAction } from "./types";

export const PullingActionCreators = {
    setPulligns:(pullings:Pulling[]): SetPullingsAction => ({type: PullingActionEnum.SET_PULLIGNS, payload: pullings}),
    setError:(error:string): SetErrorAction => ({type: PullingActionEnum.SET_ERROR, payload: error}),
    setPullingRatePulling:(ratingData:PullingRating): SetRatingAction => ({type: PullingActionEnum.SET_RATING, payload: ratingData}),
    setIsLoaded:(value:boolean): SetIsLoadedPullingAction => ({type: PullingActionEnum.SET_IS_LOADED, payload: value}),
    setIsInRating:(value:boolean): SetIsInRatingAction => ({type: PullingActionEnum.SET_IS_IN_RATING, payload: value}),
    setRatingPillingId:(id:number): SetRatingPullingIdAction => ({type: PullingActionEnum.SET_Rating_Pulling_Id, payload: id}),
    setLastPulling: (userId:number) => async (dispatch: AppDispatch) =>{
        try{
            const {data} = await PulligService.getLastPulling(userId);
       
            dispatch(PullingActionCreators.setPulligns(data));
            
        }catch(error: any){
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            dispatch(PullingActionCreators.setError(error.response?.data?.message))
        }finally{
            dispatch(PullingActionCreators.setIsLoaded(true))
        }
    },
    getUserPulling: (userId:number) => async (dispatch: AppDispatch) =>{
        dispatch(PullingActionCreators.setIsLoaded(false))
        try{
            const {data} = await $api.get(`/records/user-pillings?userId=${userId}&limit=${'all'}`);
          
            dispatch(PullingActionCreators.setPulligns(data));
         
        }catch(error: any){
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            dispatch(PullingActionCreators.setError(error.response?.data?.message))
        }
    },
    getRacketPullings: (racketId:number) => async (dispatch: AppDispatch) =>{
        dispatch(PullingActionCreators.setIsLoaded(false))
        try{
            const {data} = await $api.get(`/pullings/user-racket/${racketId}`);
            console.log(data)
            dispatch(PullingActionCreators.setPulligns(data));
         
        }catch(error: any){
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            console.log(error);
            dispatch(PullingActionCreators.setError(error.response?.data?.message))
        }
    },
    ratePulling:(ratingData:PullingRating)=> async (dispatch: AppDispatch) =>{
        try{
         
            const rate = await $api.put('/pullings/feedback',ratingData);
            if(rate){
                dispatch(PullingActionCreators.setPullingRatePulling(ratingData));
            }
        }catch(error: any){
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            console.log(error);
            dispatch(PullingActionCreators.setError(error.response?.data?.message))
        }
    }
}