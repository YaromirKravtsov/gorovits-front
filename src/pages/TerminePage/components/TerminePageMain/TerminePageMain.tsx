import { FC, useState } from 'react'
import style from './TerminePageMain.module.css'
import DropDownButton from '../DropDownButton/DropDownButton'
import UserRecords from '../../../../modules/UserRecords/components/UserRecords/UserRecords';
import RecordHeler from '../../../../helpers/recordHelper';
import Ordering from '../../../../modules/Ordering/components/Ordering/Ordering';
import { useActionData, useNavigate } from 'react-router-dom';
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

const TerminePageMain: FC = () => {
  const { setIsOrderOpen } = useActions()
  const [createReocrdType, setCreateReocrdType] = useState<number>(0);
  const { isOpen } = useTypedSelector(state => state.order)
  const { windowWidth } = useTypedSelector(state => state.adaptive)
  const [werkstatt, beratung] = RecordHeler.getBelonging()
  const navigate = useNavigate()
  const handelSelect = (option: number) => {

    if (windowWidth <= 600) {
      navigate(`/terminbuchung/${option}`)
      return;
    }
    setCreateReocrdType(option);
    setIsOrderOpen(true);
  }

  return (
    <div className={style.mainRow}>
      <div className={style.buttonRow}>
        <DropDownButton options={werkstatt} title='Werkstatt' onSelect={handelSelect} className={style.button} />
        <DropDownButton options={beratung} title='Beratung' onSelect={handelSelect} className={style.button} />
      </div>
      <UserRecords />

      {isOpen &&
        <Ordering recordType={createReocrdType} />
      }

    </div>
  )
}

export default TerminePageMain
