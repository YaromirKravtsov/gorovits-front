import React, { FC, useState } from 'react'
import { IPullingRecord, IRacketsTestRecord, IRecord } from '../../../../models/IRecord';
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import style from './OnCourtRacketTestingСard.module.css'
import RecordHeler from '../../../../helpers/recordHelper';
import BorderMenu from '../../../../UI/BorderMenu/BorderMenu';
import MyButton from '../../../../UI/MyButton/MyButton';
import MyImage from '../../../../UI/MyImage/MyImage';
import iIocn from '../../../../assets/images/i_icon.png';
import { useActions } from '../../../../hooks/useActions';
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import DeleteRecordMenu from '../DeleteRecordMenu/DeleteRecordMenu';
interface Props {
    record: IRecord
}
const OnCourtRacketTestingСard: FC<Props> = ({ record }) => {
    const [stateString, stateColor] = RecordHeler.getStateInfo(record);
    const [isDelteMenuOpen, setIsDeleteMenuOpen] = useState<boolean>(false)
    const { deleteUserRecord } = useActions();
    const handelRecordDelete = () => {
        deleteUserRecord((record as IPullingRecord).id)
    }
    const [isMOreInfoOpen, setIsMOreInfoOpen] = useState<boolean>();

    return (
        <>
            {isDelteMenuOpen &&
                <DeleteRecordMenu onDelete={handelRecordDelete} setIsOpen={(value: boolean) => setIsDeleteMenuOpen(value)} />
            }
            <GradientBlackBlock className={style.mainBlock}><>{console.log(record)}</>
                <BorderMenu className={style.leftMenu}>
                    <div className={style.topLeftBlockTitle} style={{ color: `${stateColor}` }}>{stateString}</div>
                </BorderMenu>
                <BorderMenu className={style.centralBlock}>
                    On Court Tennisschläger - Test
                </BorderMenu>
                <div className={style.buttonRow}>
                    <MyButton className={style.moreInfoButton} mode='white' onClick={() => setIsMOreInfoOpen(true)}>
                        <MyImage src={iIocn} alt='' className={style.iImage} />
                    </MyButton>
                    <MyButton className={style.delteButton} mode='white' onClick={(() => setIsDeleteMenuOpen(true))}>
                        Stornieren
                    </MyButton>
                </div>
            </GradientBlackBlock>
            {isMOreInfoOpen &&
                <FlutterMenu shadow='all' className={style.flutter}>
                    <div className={style.flutterTitle}>Schläger Liste für On Court Tennisschläger - Test</div>
                    <div className={style.flutterRacketsList}>
                        {(record as IRacketsTestRecord).testRackets.map(racket =>
                            <div className={style.flutterRacketsItem}>{racket.racketModel.manufacturer.name} {racket.racketModel.name}</div>
                        )}
                    </div>
                    <MyButton className={style.flutterButton} mode='black' onClick={() => setIsMOreInfoOpen(false)}>
                        Schließen
                    </MyButton>
                </FlutterMenu>
            }
        </>
    );
};

export default OnCourtRacketTestingСard; 
