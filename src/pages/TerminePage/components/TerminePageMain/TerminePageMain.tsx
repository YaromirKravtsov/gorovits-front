import  { FC, useState } from 'react'
import style from './TerminePageMain.module.css'
import DropDownButton from '../../../../UI/DropDownButton/DropDownButton'
import UserRecords from '../../../../modules/UserRecords/components/UserRecords/UserRecords';
import RecordHeler from '../../../../helpers/recordHelper';
import Ordering from '../../../../modules/Ordering/components/Ordering/Ordering';
import { useActionData } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

const TerminePageMain:FC = () => {
  const {setIsOrderOpen} = useActions()
  const [createReocrdType, setCreateReocrdType] = useState<number>(0);
  const {isOpen} = useTypedSelector(state=> state.order)
    const [werkstatt, beratung] = RecordHeler.getBelonging()
    const handelSelect = (option:number)=>{
        setCreateReocrdType(option);
        setIsOrderOpen(true);
    }
 
    return (
      <div className={style.mainRow}>
        <div className={style.buttonRow}>
          <DropDownButton options={werkstatt} title = 'Werkstatt' onSelect={handelSelect}/>
          <DropDownButton options={beratung} title = 'Beratung' onSelect={handelSelect}/>
        </div>
        <UserRecords/>

        {isOpen&&
        <Ordering recordType={createReocrdType}  />
        }
        
      </div>
    )
}

export default TerminePageMain
