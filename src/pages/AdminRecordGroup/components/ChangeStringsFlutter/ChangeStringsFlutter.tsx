import React, { FC, useEffect, useState } from 'react'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu'
import style from './ChangeStringsFlutter.module.css'
import SearchStrings, { StringOption } from '../../../../components/SearchStrings/SearchStrings'
import { IString } from '../../../../models/IString'
import MyButton from '../../../../UI/MyButton/MyButton'
import InputRow from '../../../../components/InputRow/InputRow'
import { IPullingRecord } from '../../../../models/IRecord'
import { AdminRecordGroupService } from '../../api/AdminRecordGroupService'
import { EditPullingDto } from '../../models/EditPullingDto'
import CheckBox from '../../../../UI/CheckBox/CheckBox'

interface Props {
    strings: IString[],
    record: IPullingRecord
    setIsOpen: (value: boolean) => void,
    handelEdit: (dto:EditPullingDto) => void
}
const ChangeStringsFlutter: FC<Props> = ({ strings, setIsOpen ,record,handelEdit}) => {
    const [adminLongStrings, setAdminLongStrings] = useState<StringOption>({ name: record.pulling.longString, id: record.pulling.stringId })
    const [adminCrossStrings, setAdminCrossStrings] = useState<StringOption>({ name: record.pulling.crossString, id: 0 })
    const [error, setError] = useState<boolean>(false)
    const [isYourLong,setIsYourLong] = useState<boolean>(false)
    const [isYourCross,setIsYourCross] = useState<boolean>(false)

    const handelEditLocal = async () => {
    
        if (adminLongStrings.name !== '') {
            handelEdit({
                longString:adminLongStrings.name + (isYourLong ? ' (Eigene Tennissaite)' : ''),
                crossString: adminCrossStrings.name  + (isYourCross ? ' (Eigene Tennissaite)' : ''),
                stringId: adminLongStrings.id,
                pullingId: record.pulling.id
            })
            return
        }
        setError(true)
    }
    useEffect(()=>{
        if(adminLongStrings.name.includes('(Eigene Tennissaite)')){
            setIsYourLong(true);
            setAdminLongStrings(prev => ({...prev, name: prev.name.replace('(Eigene Tennissaite)','')}))
        }
        if(adminCrossStrings.name.includes('(Eigene Tennissaite)')){
            setIsYourCross(true);
            setAdminCrossStrings(prev => ({...prev, name: prev.name.replace('(Eigene Tennissaite)','')}))
        }
        
    },[])

    return (
        <FlutterMenu shadow='all' className={style.flutter}>
            <div className={style.title}>Saiten bearbeiten</div>
            <div className={style.inpitsRow}>
                <InputRow label='Längstsaite'>
                    <SearchStrings
                        onSelect={(value: StringOption) => setAdminLongStrings(value)}
                        strings={strings}
                        error={error}
                        setError={setError}
                        value={adminLongStrings}
                    />
                    <CheckBox text='Eigene Tennissaite' setIsChecked={setIsYourLong} isChecked={isYourLong} className={style.checkBox} />
                </InputRow>
                <InputRow label='Quersaite'>
                    <SearchStrings
                        onSelect={(value: StringOption) => setAdminCrossStrings(value)}
                        strings={strings}
                        value={adminCrossStrings}
                    />
                    <CheckBox text='Eigene Tennissaite' setIsChecked={setIsYourCross} isChecked={isYourCross} className={style.checkBox} />
                 
                </InputRow>
            </div>
            <div className={style.buttonsRow}>
                <MyButton mode='black' border className={style.button} onClick={handelEditLocal}>Bearbeiten</MyButton>
                <MyButton mode='white' border className={style.button} onClick={() => setIsOpen(false)}>Schließen</MyButton>
            </div>

        </FlutterMenu>
    )
}

export default ChangeStringsFlutter
