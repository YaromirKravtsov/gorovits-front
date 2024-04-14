import React, { FC, useEffect, useState } from 'react';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import DropDownInput from '../../../../UI/DropDownInput/DropDownInput';
import style from './RacketsDropBlock.module.css';
import { OrderHelper } from '../../helpers/OrderHelper';
import { UserRackets } from '../../models/OrderModel';

interface Props {
    onChange: (value: number) => void;
    error: boolean;
    setError: (value: boolean) => void;
    value: number;
    defaultValue: string;
    userRackets:  UserRackets[]
}

const RacketsDropBlock: FC<Props> = (props) => {
    const [defaultRacket, setDefaultRacket] = useState<string>(props.defaultValue);

    useEffect(() => {
        if(props.value == 0){
            setDefaultRacket('')  
            setTimeout(()=>{
                setDefaultRacket('Wählen Sie einen Schläger')  
            },10)
            return; 
        }
    }, [props.value]);
    const {windowWidth} = useTypedSelector(state=> state.adaptive)
    const {userRackets} = useTypedSelector(state=> state.order)
    const userRacketsOptions = OrderHelper.getRacketOptions(props.userRackets,windowWidth);
    
    return (
        <div className={style.inputLabelBlock}>
            <div className={style.inputLabel}>Schlägerauswahl</div>
            <DropDownInput
                defaultValue={defaultRacket} // Передача defaultRacket в качестве defaultValue
                value={props.value}
                options={userRacketsOptions}
                onChange={(value: number) => { props.setError(false); props.onChange(value) }}
                defaultOptions={OrderHelper.getDefaultRacketOptions(userRackets,windowWidth)}
                className={style.dropDown}
            />
            {props.error &&
                <span className={style.errorInput}>Das Feld muss ausgefüllt werden </span>
            }
        </div>
    )
}

export default RacketsDropBlock;
