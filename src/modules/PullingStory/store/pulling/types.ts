export interface Pulling{
    crossString: string;
    feedback: boolean;
    id: number;
    longString: string;
    recordId: number;
    string: { imgLink: string };
    stringHardness: string;
    stringId: number;
    userRacket: {
        number: number;
        code: string;
        racketModelId: number;
        racketModel: {
            imgLink: string;
        }
    };
    record: {
        dateTime:Date;
    }
    userRacketId: number;
}
export interface PullingRating{
    
    pullingId: number; // Идентификатор перетяжки
    feedback: boolean; // Оценка (true - хорошо, false - плохо)
    
}
export interface PullingState{
    pullings: Pulling[],
    error: string,
    isLoaded:boolean,
    isInRating:boolean;
    ratingPullingId: number;
}

export enum PullingActionEnum{
    SET_PULLIGNS = 'SET_PULLIGNS',
    SET_ERROR = 'SET_ERROR',
    SET_RATING = 'SET_RATING',
    SET_IS_LOADED = 'SET_IS_LOADED',
    SET_IS_IN_RATING = 'SET_IS_IN_RATING',
    SET_Rating_Pulling_Id = 'SET_Rating_Pulling_Id'
}
export interface  SetPullingsAction{
    type: PullingActionEnum.SET_PULLIGNS; 
    payload: Pulling[];
} 

export interface SetErrorAction{
    type: PullingActionEnum.SET_ERROR; 
    payload: string;
} 

export interface SetRatingAction {
    type: PullingActionEnum.SET_RATING;
    payload:PullingRating
}
export interface SetIsLoadedPullingAction {
    type: PullingActionEnum.SET_IS_LOADED;
    payload:boolean
}

export interface SetIsInRatingAction {
    type: PullingActionEnum.SET_IS_IN_RATING;
    payload:boolean
}

export interface SetRatingPullingIdAction {
    type: PullingActionEnum.SET_Rating_Pulling_Id;
    payload:number;
}


export type PullingAction = SetPullingsAction |SetErrorAction|SetRatingAction |SetIsLoadedPullingAction |SetIsInRatingAction |SetRatingPullingIdAction;