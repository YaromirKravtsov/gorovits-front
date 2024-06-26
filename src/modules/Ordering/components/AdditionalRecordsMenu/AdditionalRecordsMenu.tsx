import React, { FC, useState } from 'react'
import SelectDateMenu from '../SelectDateMenu/SelectDateMenu'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useActions } from '../../../../hooks/useActions';
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import OrderFlutterMenu from '../OrderFlutterMenu/OrderFlutterMenu';
import RecordHeler from '../../../../helpers/recordHelper';
import OrderComment from '../OrderComment/OrderComment';
import { CreateRecordDto, CreateRecordType } from '../../../../models/IRecord';
import { RouteNames } from '../../../../app/router';
import { useNavigate } from 'react-router-dom';

interface Props {
  type: number
}
const AdditionalRecordsMenu: FC<Props> = (props) => {
  const { isDateBlockOpen } = useTypedSelector(state => state.order);
  const { userInfo } = useTypedSelector(state => state.user);
  const { setIsOrderOpen, createRecord, setIsDateBlockOpen } = useActions()
  const [orderBlockHidden, setOrderBlockHidden] = useState<boolean>(false);
  //====
  const [dateTime, setDateTime] = useState<Date>(new Date())
  const [comment, setComment] = useState<string>('')
  const navigate = useNavigate();
  const { windowWidth } = useTypedSelector(state => state.adaptive)
  const blockTitle = RecordHeler.getNameByRecordType(props.type) + ' buchen';
  const handelCloseOrderBlock = () => {
    if (windowWidth <= 600) {
      navigate(RouteNames.TERMINE)
    }
    setIsOrderOpen(false)
  }

  //===
  const handelTimeSelect = () => {
    setOrderBlockHidden(true)
    setIsDateBlockOpen(true)
  }

  const handelSubmit = async () => {
    console.log(dateTime, comment);
    const record: CreateRecordType = {
      recordType: props.type,
      dateTime: dateTime,
      userComment: comment,
      userId: userInfo.userId,
      state: 1,
    }
    console.log(record)
    setIsOrderOpen(false)
    await createRecord([record], userInfo.userId)
  }

  return (
    <>
      <OrderFlutterMenu title={blockTitle}
        onClose={handelCloseOrderBlock}
        onSubmit={handelTimeSelect}
        hidden={orderBlockHidden}
      >
        <OrderComment onChange={(value: string) => setComment(value)} value={comment} />
      </OrderFlutterMenu>
      {isDateBlockOpen &&
        <SelectDateMenu recordType={props.type == 5 ? 1 : 2} onSelect={(value: Date) => setDateTime(value)} onSubmit={handelSubmit} onClose={() => { setOrderBlockHidden(false); setIsDateBlockOpen(false) }} />
      }

    </>
  )
}

export default AdditionalRecordsMenu
