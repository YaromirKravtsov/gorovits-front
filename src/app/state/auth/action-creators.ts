import axios from "axios";
import { AppDispatch } from "../../../store/index";
import { AuthActionsEmun, RrcordsSearchParams, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetaRecordsSearchParamsAction } from "./types";
import AuthService from "../../api/service/AuthService";
import { API_URL } from "../../api/http";
import {jwtDecode } from "jwt-decode";
import { UserActionCreators } from "../../../store/reducers/user/action-creators";
import { IUser } from "../../../models/IUser";
import { getErrorText } from "../../../helpers/FormDataGeneration";


export const AuthActionCreators = {
   
    setIsAuth:(auth:boolean): SetAuthAction => ({type: AuthActionsEmun.SET_AUTH, payload: auth}),
    setIsLoadingAuth:(payload:boolean): SetIsLoadingAction => ({type: AuthActionsEmun.SET_IS_LOADING, payload: payload}),
    setGlobalError:(payload:string): SetErrorAction => ({type: AuthActionsEmun.SET_ERROR, payload}),
    setRecordsSearchParams:(payload:RrcordsSearchParams): SetaRecordsSearchParamsAction => ({type: AuthActionsEmun.SET_RECORDS_SEARCH_PARAMS, payload}),

    login:(email:string,password:string) => async (dispatch: AppDispatch) =>{
        try{
            
            const response = await AuthService.login(email,password);
            
            const decodedToken :any = jwtDecode(response.data.accessToken);
            const user: IUser = {
                userId: decodedToken.userId,
                fullName: decodedToken.fullName
            }
            dispatch(UserActionCreators.setUserPhoto(decodedToken.photoLink))
            dispatch(UserActionCreators.setUser(user))
            dispatch(UserActionCreators.setRole(decodedToken.role));
            localStorage.setItem('token',response.data.accessToken);
            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setGlobalError(''))
        }catch(error: any){
            console.log(error)
     
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
        }
    },
    logout:() => async (dispatch: AppDispatch) =>{
        try{
             await AuthService.logout();
                localStorage.removeItem('token');
                dispatch(AuthActionCreators.setIsAuth(false));
                dispatch(UserActionCreators.setRole(''));
    
            }catch(error: any){
                console.log(error.response?.data?.message)
            }
    },
    checkAuth: ()=> async(dispatch: AppDispatch)=>{
        dispatch(AuthActionCreators.setIsLoadingAuth(true));
        try{
            const response = await axios.get(`${API_URL}/token/refresh`,{withCredentials:true});
            localStorage.setItem('token',response.data.accessToken);
            const decodedToken :any = jwtDecode(response.data.accessToken);
            const user: IUser = {
                userId: decodedToken.userId,
                fullName: decodedToken.fullName,
                
            }
            dispatch(UserActionCreators.setUserPhoto(decodedToken.photoLink))
            dispatch(UserActionCreators.setUser(user))
            dispatch(UserActionCreators.setRole(decodedToken.role));
            dispatch(AuthActionCreators.setIsAuth(true));
        }catch(error: any){
            console.log(error.response?.data?.message)
        }finally{
            dispatch(AuthActionCreators.setIsLoadingAuth(false));

        }
    },
    
}