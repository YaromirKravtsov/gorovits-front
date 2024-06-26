import React, { FC, useState } from 'react'
import { IRecord } from '../../../../models/IRecord'
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import style from './AdditionalRecordsCard.module.css'
import RecordHeler from '../../../../helpers/recordHelper';
import BorderMenu from '../../../../UI/BorderMenu/BorderMenu';
import MyButton from '../../../../UI/MyButton/MyButton';
import { useActions } from '../../../../hooks/useActions';
import DeleteRecordMenu from '../DeleteRecordMenu/DeleteRecordMenu';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import MyImage from '../../../../UI/MyImage/MyImage';
interface Props {
    record: IRecord
}

const AdditionalRecordsCard: FC<Props> = ({ record }) => {
    const [stateString, stateColor] = RecordHeler.getStateInfo(record);
    const recordName = RecordHeler.getNameByRecordType(record.recordType);
    const { deleteUserRecord } = useActions();

    const [isDelteMenuOpen, setIsDeleteMenuOpen] = useState<boolean>(false);
    const handelRecordDelete = () => {
        deleteUserRecord(record.id)
    }
  
    const { windowWidth } = useTypedSelector(state => state.adaptive)
    return (
        <>
            <GradientBlackBlock className={style.mainBlock}>
                <BorderMenu className={style.leftBlock}>
                    <div style={{ color: `${stateColor}` }}>{stateString}</div>
                </BorderMenu>
                <BorderMenu className={style.centerBlock}>
                    {windowWidth >= 600 ? 
                    recordName:
                    RecordHeler.insertSpaceIfNeeded(recordName,10)
                }
                </BorderMenu>

                <MyButton className={style.button} onClick={() => setIsDeleteMenuOpen(true)}>Stornieren</MyButton>



            </GradientBlackBlock>
            {isDelteMenuOpen &&
                <DeleteRecordMenu onDelete={handelRecordDelete} setIsOpen={(value: boolean) => setIsDeleteMenuOpen(value)} />
            }
        </>
    )
}

export default AdditionalRecordsCard
