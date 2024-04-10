import { INewRacket } from "../../../../models/INewRackets";
import { NewRacketActions, NewRackets, NewRacketsActionEnum } from "./type";


const initialState: NewRackets = {
    newRackets: [] as INewRacket[],
}

export default function(state = initialState, action: NewRacketActions){
     switch(action.type){
        case NewRacketsActionEnum.ADD_NEW_RACKET:
            return {...state, newRackets: [...state.newRackets, action.payload] }
        case NewRacketsActionEnum.DELETE_NEW_RACKET:
            return {...state,
                newRackets: state.newRackets.filter(racket=> Number(racket.id) !== action.payload)
            }
        case  NewRacketsActionEnum.SET_NEW_RACKETS:
            return {...state, newRackets: action.payload}
            case NewRacketsActionEnum.UPDATE_NEW_RACKET:
                const { id } = action.payload;
                return {
                    ...state,
                    newRackets: state.newRackets.map(existingRacket => {
                        if (Number(existingRacket.id) === id) {
                            return action.payload; // Заменяем ракетку новой из payload, если id совпадает
                        } else {
                            return existingRacket; // Возвращаем текущую ракетку без изменений
                        }
                    })
                };
            
        default:
            return state;

     }
}