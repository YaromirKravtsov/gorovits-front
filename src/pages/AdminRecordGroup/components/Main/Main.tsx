import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import Loader from '../../../../UI/Loader/Loader'
import { GroupedRecords } from '../../../../models/IRecord'
import style from './Main.module.css'
import AdminCommentBlock from '../AdminCommentBlock/AdminCommentBlock'
import AdminRecordCard from '../AdminRecordCard/AdminRecordCard'

const Main = () => {
    const { recordGroup, isLoading } = useTypedSelector(state => state.recordGroup)
    return (
        <div className={style.main}>
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
