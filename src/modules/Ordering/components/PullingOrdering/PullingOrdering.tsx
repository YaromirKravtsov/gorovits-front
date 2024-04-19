import { FC, useEffect, useState } from 'react';

import OderInput from '../../../../components/MyInput/MyInput';

import { useActions } from '../../../../hooks/useActions';
import OrderComment from '../OrderComment/OrderComment';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { CreatePullingDto, CreateRecordDto } from '../../../../models/IRecord';
import { OrderPulling, OrderRecord } from '../../models/OrderModel';
import OrderMenuWithRackets from '../OrderMenuWithRackets/OrderMenuWithRackets';
import { OrderPullingsErrors, OrderRecordErrors } from '../../models/OrderRecordErrors';
import SearchStrings, { StringOption } from '../../../../components/SearchStrings/SearchStrings';
import InputRow from '../../../../components/InputRow/InputRow';
import style from './PullingOrdering.module.css';
import CheckBox from '../../../../UI/CheckBox/CheckBox';
interface Props {
    type: number
}
const PullingOrdering: FC<Props> = (props) => {

    // in redux state, actions
    const { userInfo } = useTypedSelector(state => state.user)
    const { orderRecords } = useTypedSelector(state => state.orderRecord);
    const { strings } = useTypedSelector(state => state.order);
    const { createRecord } = useActions();
    //===

    const [pullingData, setPullingData] = useState<OrderRecord>({
        id: 0,
        racketId: 0,
        stringHardnes: '',
        longStrings: {
            name: '',
            id: 0,
        },
        crossStrings: {
            name: '',
            id: 0,
        },
        comment: ''
    })
    const [dateTime, setDateTime] = useState<Date>(new Date());
    const [isYourLong, setIsYourLong] = useState<{}>(
        false
    );
    const [isYourCross, setIsYourCross] = useState<{}>(
        false
    );
    // in sattes
    const [inputsErrors, setInputsErrors] = useState<OrderRecordErrors>({
        racketId: false,
        stringHardnes: false,
        longStrings: false,
    })
    //========= Record Info
    //=== funcs
    const inputsValidate = () => {
        console.log(pullingData.racketId !== -1 && pullingData.racketId !== 0)
        let errors: OrderRecordErrors = {
            racketId: (pullingData.racketId === -1 || pullingData.racketId === 0),
            stringHardnes: !(pullingData as OrderPulling).stringHardnes.trim(),
            longStrings: !(pullingData as OrderPulling).longStrings.name.trim(),

        };
        setInputsErrors(errors);
        if (!errors.racketId && !errors.stringHardnes && !errors.longStrings) {
            return true;
        }
        return false;
    }
    const createPullingRecord = async () => {
        const pullingsCreateData: CreatePullingDto[] = orderRecords.map((record: OrderRecord) => {
            const pulling = record as OrderPulling;
            return {
                stringHardness: pulling.stringHardnes,
                longString: pulling.longStrings.name + (isYourLong ? '(Eigene Tennissaite)' : ''),
                crossString: pulling.crossStrings?.name + ((pulling.crossStrings?.name && isYourCross) ? '(Eigene Tennissaite)' : ''),
                stringId: pulling.longStrings.id,
                userRacketId: pulling.racketId,
                recordId: pulling.id,
                recordType: props.type,
                dateTime: dateTime,
                state: 1,
                userComment: pulling.comment,
                userId: userInfo.userId,
            };
        })

        await createRecord(pullingsCreateData, userInfo.userId);
    }


    return (
        <>
            <OrderMenuWithRackets title={props.type == 1 ? 'Express direkt beseitung' : 'Besaitung'} createRecord={createPullingRecord} setRecordData={(data: OrderRecord) => setPullingData(data)}
                setDateTime={(data: Date) => setDateTime(data)}
                recordData={pullingData}
                inputsValidate={inputsValidate}
                inputsErrors={inputsErrors}
                setInputsErrors={(errors: OrderRecordErrors) => setInputsErrors(errors)}
                recordType={props.type}
            >
                <InputRow label='Besaitungshärte'>
                    <OderInput
                        onChange={(value: string) => setPullingData(prev => ({ ...prev, stringHardnes: value }))}
                        mask='99×99'
                        placeholder='__×__'
                        error={(inputsErrors as OrderPullingsErrors).stringHardnes}
                        setError={(value: boolean) => setInputsErrors({ ...inputsErrors, stringHardnes: value })}
                        value={(pullingData as OrderPulling).stringHardnes}
                        className={style.input}
                    />
                </InputRow>
                <InputRow label='Längstsaite'>
                    <SearchStrings
                        onSelect={(value: StringOption) => setPullingData(prev => ({ ...prev, longStrings: value }))}
                        strings={strings}
                        error={(inputsErrors as OrderPullingsErrors).longStrings}
                        setError={(value: boolean) => setInputsErrors({ ...inputsErrors, longStrings: value })}
                        value={(pullingData as OrderPulling).longStrings}
                    />
                    {(pullingData as OrderPulling).longStrings.name !== '' && (pullingData as OrderPulling).longStrings.id !== -1&&
                        <CheckBox text='Eigene Tennissaite' setIsChecked={setIsYourLong} className={style.checkBox} />
                    }

                </InputRow>
                <InputRow label='Quersaite' questionMark questionText='Wenn Sie keine Quersaite auswählen, wird sie gleich der Längstsaite sein'>
                    <SearchStrings
                        strings={strings}
                        onSelect={(value: StringOption) => setPullingData(prev => ({ ...prev, crossStrings: value }))}
                        value={(pullingData as OrderPulling).crossStrings}
                    />
                    {(pullingData as OrderPulling).crossStrings.name !== '' && (pullingData as OrderPulling).crossStrings.id !== -1&&
                        <CheckBox text='Eigene Tennissaite' setIsChecked={setIsYourLong} className={style.checkBox} />
                    }
                </InputRow>
                <OrderComment onChange={(value: string) => setPullingData(prev => ({ ...prev, comment: value }))} value={pullingData.comment} />
            </OrderMenuWithRackets>
        </>
    );
};

export default PullingOrdering;