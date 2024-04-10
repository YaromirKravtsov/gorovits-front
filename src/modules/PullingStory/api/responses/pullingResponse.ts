export interface GetPullungResponse{
    crossString: string;
    feedback: boolean;
    id: number;
    longString: string;
    recordId: number;
    string: { imgLink: string };
    stringHardness: string;
    stringId: number;
    userRacket: {
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