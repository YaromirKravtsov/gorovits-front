export interface AdaptiveState{
    isNavOpen: boolean,
    windowWidth: number,
    windowHeight: number,
}


export enum AdaptiveActionsEnum {
    SET_IS_NAV_OPEN = "SET_IS_NAV_OPEN",
    SET_WINDOW_WIDTH = "SET_WINDOW_WIDTH",
    SET_WINDOW_HEIGHT = "SET_WINDOW_HEIGHT",
}


export interface SetIsNavOpenAction{
    type: AdaptiveActionsEnum.SET_IS_NAV_OPEN;
    payload: boolean
}

export interface SetWindowWidthAction{
    type: AdaptiveActionsEnum.SET_WINDOW_WIDTH;
    payload: number
}

export interface SetWindowHeightAction{
    type: AdaptiveActionsEnum.SET_WINDOW_HEIGHT;
    payload: number
}
export type AdaptiveActions = SetIsNavOpenAction | SetWindowWidthAction |SetWindowHeightAction