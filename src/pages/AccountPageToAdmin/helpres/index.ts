import { StringOption } from "../../../components/SearchStrings/SearchStrings";
import { INewRacket } from "../../../models/INewRackets";
import { RacketsResponse } from "../../../pages/AccountPageToAdmin/api/AccountService";

export function mapRacketsResponseToINewRacket(response: RacketsResponse[]): INewRacket[] {
    return response.map(item => ({
        id: item.id,
        racketModelId: item.racketModelId,
        number: item.number.toString(),
        code: item.code,
        racketModelName: item.racketModel.manufacturer.name + " " + item.racketModel.name,
        balancePoint: item.tuning ? item.tuning.balancePoint : '',
        totalWeight: item.tuning ? item.tuning.totalWeight : '',
        swingWeight: item.tuning ? item.tuning.swingWeight : '',
        longString: { name: item.pulling.longString, id: item.pulling.stringId } as StringOption,
        crossString: item.pulling.crossString ? { name: item.pulling.crossString, id: 0 } as StringOption : { name: '', id: 0 },
        stringHardness: item.pulling.stringHardness,
        stringId: item.pulling.stringId
    }));
}
