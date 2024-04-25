import { AppDispatch } from "../..";
import $api from "../../../app/api/http";
import { AuthActionCreators } from "../../../app/state/auth/action-creators";
import { ChangePasswordDto } from "../../../components/ChangePasswordMenu/ChangePasswordMenu";
import { FormDataGeneration, getErrorText } from "../../../helpers/FormDataGeneration";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { HTTPError } from "../../../models/IError";
import { IUser } from "../../../models/IUser";
import UserInfoService from "../../../pages/KundenkontoPage/api/services/UserInfoService";

import { SetEditUserInfoError, SetErrorAction, SetIsEditingAction, SetPhotoAction, SetRoleAction, SetUserAction, SetUserEditingInfoAction, UserActionEmun, UserRole } from "./types";


export const UserActionCreators = {
    
    setUser:(user:IUser): SetUserAction => ({type: UserActionEmun.SET_USER, payload: user}),
    setRole:(role:UserRole): SetRoleAction => ({type: UserActionEmun.SET_ROLE, payload: role}),
    setUserPhoto:(photoLink:string): SetPhotoAction => ({type: UserActionEmun.SET_PHOTO, payload: photoLink}),
    setError:(error:string): SetErrorAction => ({type: UserActionEmun.SET_ERROR, payload: error}),
    setIsEditing:(value:boolean): SetIsEditingAction => ({type: UserActionEmun.SET_IS_EDITING, payload: value}),
    getUserInfo: (userId:number) => async (dispatch: AppDispatch) =>{
        try{
            const {data} = await UserInfoService.getUserInfo(userId)
            console.log(data)
            const userData: IUser = {
                fullName: data.fullName,
                userId: data.id,
                email: data.email,
                phoneNumber: data.phoneNumber,
        
            }
            dispatch(UserActionCreators.setUserPhoto(data.photoLink));
            dispatch(UserActionCreators.setUser(userData));
        }catch(error){
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            console.log(error);
            dispatch(UserActionCreators.setError((error as Error).message));
        }
       
    },
    
    putPhoto: (userId:number, photo: File | null, photoType: string) => async (dispatch: AppDispatch) =>{
        try{
            const formData = FormDataGeneration(photo , { photoType} );
            const {data} = await UserInfoService.putUserPhoto(userId,formData);
            console.log(data)
            dispatch(UserActionCreators.setUserPhoto(data.photoLink));
  
        }catch(error){
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
            console.error(error );
            dispatch(UserActionCreators.setError((error as Error).message))
        }
       
    },
    //
    setUserEditingInfo:(user:IUser): SetUserEditingInfoAction => ({type: UserActionEmun.SET_USER_EDITING_INFO, payload: user}),
    setEditUserInfoError:(error:string): SetEditUserInfoError => ({type: UserActionEmun.SET_EDIT_USER_INFO_ERROR, payload: error}),
    putUserInfo: (userInfo:IUser) => async (dispatch: AppDispatch) =>{
        try{
            await  UserInfoService.putUserInfo(userInfo);

            dispatch(UserActionCreators.setUser(userInfo));
        }catch(error){
            dispatch(UserActionCreators.setEditUserInfoError((error as Error).message))
            console.log((error as Error).message)
        }
    },
    changePasword: (dto:ChangePasswordDto)=> async(dispatch: AppDispatch)=>{
        try{
            await $api.put('/users/password',dto)
            dispatch(UserActionCreators.setEditUserInfoError(''))
        }catch(error){
            dispatch(UserActionCreators.setEditUserInfoError(getErrorText(error)))
            dispatch(AuthActionCreators.setGlobalError(getErrorText(error)))
           
        }
    }
    
}

