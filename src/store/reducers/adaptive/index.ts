import { AdaptiveActions, AdaptiveActionsEnum, AdaptiveState } from "./type";

const internalState: AdaptiveState = {
    isNavOpen: false,
    windowWidth: window.innerWidth,
    windowHeight:window.innerHeight,
}
export default function (state = internalState, action: AdaptiveActions) {
    switch (action.type) {
        case AdaptiveActionsEnum.SET_IS_NAV_OPEN:
            return { ...state, isNavOpen: action.payload }
        case AdaptiveActionsEnum.SET_WINDOW_WIDTH:
            return { ...state, windowWidth: action.payload }
        case AdaptiveActionsEnum.SET_WINDOW_HEIGHT:
            return { ...state, windowHeight: action.payload }
        default:
            return state
    }
}