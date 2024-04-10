
import {  UserActionEmun, UserState, UserInfoAction } from "./types";
import { IUser } from "../../../models/IUser";
const initialState: UserState = {
    userInfo: {} as IUser,
    photoLink: '',
    role:'',
    error: '',
    isEditing: false,
    userEdititngInfo:  {} as IUser,
    editUserInfoError: '',
}
export default function(state = initialState, action: UserInfoAction):UserState{
    switch(action.type){
        case UserActionEmun.SET_USER:
            return {...state, userInfo: action.payload};
        case UserActionEmun.SET_PHOTO:
            return {...state, photoLink:action.payload}
        case UserActionEmun.SET_ERROR:
            return {...state, error:action.payload}
        case UserActionEmun.SET_ROLE:
            return {...state, role:action.payload}
        case UserActionEmun.SET_IS_EDITING:
            return {...state, isEditing:action.payload}
        case UserActionEmun.SET_USER_EDITING_INFO:
            return {...state, userEdititngInfo:action.payload}
        case UserActionEmun.SET_EDIT_USER_INFO_ERROR:
            return {...state, editUserInfoError:action.payload}
        default:
            return state;
    }

}