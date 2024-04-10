
export interface AuthState {
    isAuth: boolean;
    /*     user: IShortUser; */
    isLoading: boolean;
    error: string;

    recordsSearchParams: RrcordsSearchParams
}

export interface RrcordsSearchParams {

    string: string,
    state: number

}
export enum AuthActionsEmun {
    SET_AUTH = "SET_AUTH",
    SET_ERROR = "SET_ERROR",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_NAV_BAR_ACTIVE_ITEM = "SET_NAV_BAR_ACTIVE_ITEM",
    SET_RECORDS_SEARCH_PARAMS = "SET_RECORDS_SEARCH_PARAMS"
}
export interface SetAuthAction {
    type: AuthActionsEmun.SET_AUTH;
    payload: boolean;
}

export interface SetErrorAction {
    type: AuthActionsEmun.SET_ERROR;
    payload: string;
}


export interface SetIsLoadingAction {
    type: AuthActionsEmun.SET_IS_LOADING;
    payload: boolean;
}



export interface SetaRecordsSearchParamsAction {
    type: AuthActionsEmun.SET_RECORDS_SEARCH_PARAMS;
    payload: RrcordsSearchParams;
}

export type AuthAction =
    SetAuthAction |
    SetErrorAction |
    SetIsLoadingAction |
    SetaRecordsSearchParamsAction
    ;