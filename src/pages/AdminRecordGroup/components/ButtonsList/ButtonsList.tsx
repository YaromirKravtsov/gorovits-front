import React, { FC, useEffect, useState } from 'react'
import { GroupedRecords, IRecord } from '../../../../models/IRecord'
import MyButton from '../../../../UI/MyButton/MyButton'
import style from './ButtonsList.module.css'
import { useActions } from '../../../../hooks/useActions'
import MyImage from '../../../../UI/MyImage/MyImage'
import orderCheckoutIcon from '../../../../assets/images/order-release-icon.png'
import sumbitIcon from '../../../../assets/images/sumbit-icon.png'
import changeTimeIcon from '../../../../assets/images/change-time.png'
import deleteIcon from '../../../../assets/images/delete-racket-icon.png'
import { useNavigate } from 'react-router-dom'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import MyInput from '../../../../components/MyInput/MyInput'
import FormatDate from '../../../../helpers/dates'
type Type = 'single' | 'group'
interface Props {
    record: IRecord | GroupedRecords,
    type: Type
}
const ButtonsList: FC<Props> = ({ record, type }) => {
    const navigate = useNavigate()
    const { updateGroupRecordState, deleteRecordFromGroup, destroyRecordFromGroup, changePickUpTime } = useActions();
    const { recordGroup, isLoading } = useTypedSelector(state => state.recordGroup)
    const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState<boolean>(false);
    const [isDateChanging, setIsDateSchanging] = useState<boolean>();
    const handelDone = async () => {
        if (type == 'group') {
            (record as GroupedRecords).records.forEach(async record => {
                await updateGroupRecordState(record.id, 3);
            })
        } else if (type == 'single') {
            await updateGroupRecordState((record as IRecord).id, 3);
        }


    }

    const checkout = async () => {
        if (type == 'single') {
            await updateGroupRecordState((record as IRecord).id, -1);
        }
        if (type == 'group') {
            (record as GroupedRecords).records.forEach(async record => {
                await updateGroupRecordState(record.id, -1);
                navigate('/current-orders')
            })

        }
    }


    const deleteRecord = async () => {
        if (type == 'single') {
            await deleteRecordFromGroup((record as IRecord).id);
            destroyRecordFromGroup((record as IRecord).id)


        } else if (type == 'group') {
            (record as GroupedRecords).records.forEach(async (record) => {
                await deleteRecordFromGroup(record.id);
            })
            navigate('/current-orders');
            setIsDeleteMenuOpen(false)
        }
    }

    useEffect(() => {
        if (!isLoading && type === 'group') {
        }
        if (!isLoading && type === 'group' && recordGroup.records.length === 0) {
            navigate('/current-orders');
        }
    }, [recordGroup]);
    useEffect(()=>{
        console.log(record.pickupTime)
        if(record.pickupTime&& record.pickupTime !== 'null'&&!isLoading ){
        setSelectedDate(FormatDate.dateToInput(new Date(record.pickupTime)))
        }
       
    },[record.pickupTime,isLoading])


    const [selectedDate, setSelectedDate] = useState<string>('');
    const changePichUpTime = async () => {
        if (type == 'single') {


            await changePickUpTime((record as IRecord).id, new Date(selectedDate))
        } else if (type == 'group') {
            (record as GroupedRecords).records.forEach(async (record) => {
                await changePickUpTime((record as IRecord).id, new Date(selectedDate))
            })
        }
        setIsDateSchanging(false)
    }
    if (record.state == -1) {
        return <></>
    }
    return (
        <>
            {record.recordType <= 4 ?
                <>
                    {isDateChanging &&
                        <FlutterMenu shadow='all' className={style.recordFlutter}>
                            <div className={style.recordFlutterTitle}>Wählen Sie eine Zeit </div>
                            <MyInput type='datetime-local' value={selectedDate} onChange={setSelectedDate} placeholder='' className={style.changeTimeInput} />
                            <div className={style.buttonRow}>
                                <MyButton mode='white' onClick={() => setIsDateSchanging(false)} border>
                                    Abbrechen
                                </MyButton>
                                <MyButton mode='black' onClick={changePichUpTime}>
                                    Erstellen
                                </MyButton>
                            </div>
                        </FlutterMenu>
                    }
                    {isDeleteMenuOpen &&
                        <FlutterMenu shadow='all' className={style.recordFlutter}>
                            <div className={style.recordFlutterTitle}>Bestellung löschen</div>
                            <div className={style.recordFlutterText}>Sind Sie sicher, dass Sie den Bestellung löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden</div>
                            <div className={style.buttonRow}>
                                <MyButton mode='white' onClick={() => setIsDeleteMenuOpen(false)} border>
                                    Abbrechen
                                </MyButton>
                                <MyButton mode='black' onClick={deleteRecord}>
                                    Stornieren
                                </MyButton>
                            </div>
                        </FlutterMenu>
                    }
                    {record.state == 2 &&

                        <MyButton className={`${style.button} ${style.green}`} onClick={handelDone}>
                            <MyImage className={style.buttonImage} src={sumbitIcon} alt='' />
                        </MyButton>
                    }
                    {record.state == 3 ?
                        <MyButton className={`${style.button} ${style.green} ${style.checkout}`} onClick={checkout}>
                            <MyImage className={style.buttonImage} src={orderCheckoutIcon} alt='' />
                        </MyButton>
                        : (record.state !== -1) &&
                        <>

                            <MyButton className={`${style.button} ${style.yellow}`} onClick={() => setIsDateSchanging(true)}>
                                <MyImage className={style.buttonImage} src={changeTimeIcon} alt='' />
                            </MyButton>
                            <MyButton className={`${style.button} ${style.red}`} onClick={() => setIsDeleteMenuOpen(true)}>
                                <MyImage className={style.buttonImage} src={deleteIcon} alt='' />
                            </MyButton>
                        </>
                    }

                </>
                :
                <>
                    <MyButton className={`${style.button} ${style.green} ${style.checkout}`} onClick={checkout}>
                        <MyImage className={style.buttonImage} src={orderCheckoutIcon} alt='' />
                    </MyButton>
                    <MyButton className={`${style.button} ${style.red}`} onClick={() => setIsDeleteMenuOpen(true)}>
                        <MyImage className={style.buttonImage} src={deleteIcon} alt='' />
                    </MyButton>
                </>
            }
        </>

    )
}

export default ButtonsList
