import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { bindActionCreators } from "redux";
import { allActionsCreators } from "../store/reducers/action-creators";

export const useActions = ()=> {
    const dispatch = useDispatch<AppDispatch>();
    return bindActionCreators(allActionsCreators, dispatch)
}