import { AdaptiveActionsEnum, SetIsNavOpenAction, SetWindowHeightAction, SetWindowWidthAction } from "./type";

export const AdaptiveActionsCreator = {
    setIsNavOpen: (value:boolean): SetIsNavOpenAction => ({type: AdaptiveActionsEnum.SET_IS_NAV_OPEN,payload: value}),
    setWindowWidth: (value:number): SetWindowWidthAction => ({type: AdaptiveActionsEnum.SET_WINDOW_WIDTH,payload: value}),
    setWindowHight: (value:number): SetWindowHeightAction => ({type: AdaptiveActionsEnum.SET_WINDOW_HEIGHT,payload: value}),
}