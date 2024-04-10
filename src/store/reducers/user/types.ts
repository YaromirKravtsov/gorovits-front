
import { IUser } from "../../../models/IUser";
export type UserRole = 'user' | 'admin' | ''
export interface UserState{
    userInfo: IUser;
    photoLink:string;
    error: string;
    role:UserRole;
    isEditing: boolean;
    userEdititngInfo: IUser,
    editUserInfoError:string,
}

export enum UserActionEmun{
    SET_USER= 'SET_USER',
    SET_PHOTO = 'SET_USER_PHOTO',
    SET_ERROR = 'SET_USER_ERROR',
    SET_ROLE = "SET_ROLE",
    SET_IS_EDITING = "SET_IS_EDITING",
    SET_USER_EDITING_INFO = 'SET_USER_EDITING_INFO',
    SET_EDIT_USER_INFO_ERROR = 'SET_EDIT_USER_INFO_ERROR'
}

export interface SetUserAction{
    type: UserActionEmun.SET_USER; 
    payload: IUser;
}

export interface SetPhotoAction{
    type: UserActionEmun.SET_PHOTO; 
    payload: string;
}
export interface SetErrorAction{
    type: UserActionEmun.SET_ERROR; 
    payload: string;
}

export interface SetRoleAction{
    type: UserActionEmun.SET_ROLE; 
    payload: UserRole;
}
export interface SetIsEditingAction{
    type: UserActionEmun.SET_IS_EDITING; 
    payload: boolean;
}
export interface  SetUserEditingInfoAction{
    type: UserActionEmun.SET_USER_EDITING_INFO; 
    payload: IUser;
}

export interface  SetEditUserInfoError{
    type: UserActionEmun.SET_EDIT_USER_INFO_ERROR; 
    payload: string;
}
export type UserInfoAction =
 SetUserAction |
 SetPhotoAction |
 SetErrorAction |
 SetRoleAction |
 SetIsEditingAction |
 SetUserEditingInfoAction|
 SetEditUserInfoError;