export interface IRacket{
    code: string;
    currentPullingId: number;
    currentTuningId: number;
    id: number;
    number: number;
    pulling: {
        crossString: string;
        feedback: boolean;
        id: number;
        longString: string;
        recordId: number;
        string: {
            imgLink: string;
        };
        stringHardness: string;
        stringId: number;
        userRacketId: number;
        
    };
    tuning: {
        balancePoint: string;
        id: number;
        recordId: number | null;
        swingWeight: string;
        totalWeight: string;
        userRacketId: number;
    };
    racketModel: {
        imgLink: string;
    };
}