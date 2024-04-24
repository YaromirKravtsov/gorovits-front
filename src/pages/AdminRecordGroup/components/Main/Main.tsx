import React from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import Loader from '../../../../UI/Loader/Loader'
import RecordHeler from '../../../../helpers/recordHelper'
import { GroupedRecords } from '../../../../models/IRecord'
import style from './Main.module.css'
import MyButton from '../../../../UI/MyButton/MyButton'
import AdminCommentBlock from '../AdminCommentBlock/AdminCommentBlock'
import AdminRecordCard from '../AdminRecordCard/AdminRecordCard'
import PDFLib from 'pdf-lib';
const Main = () => {
    const { recordGroup, isLoading } = useTypedSelector(state => state.recordGroup)
  
    return (
        <div>
            {

                isLoading ?
                    <Loader />
                    :
                    <>
                        {
                            <>
                                <div className={style.recordsRow}>
                                    {Array.isArray(recordGroup.records) &&
                                        (recordGroup as GroupedRecords).records.map((record) =>
                                            <>
                                                <AdminRecordCard record={record} key={record.id} />
                                            </>
                                        )}
                                </div>
                                
                                <AdminCommentBlock />
                            </>
                        }
                    </>
            }

        </div>
    )
}

export default Main
