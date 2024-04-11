import React, { FC, useEffect } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import PageLayout from '../../../../components/Layout/PageLayout/PageLayout'
import { Helmet } from 'react-helmet'
import TopMenu from '../TopMenu/TopMenu'
import { useActions } from '../../../../hooks/useActions'
import { useLocation, useParams } from 'react-router-dom'
import FormatDate from '../../../../helpers/dates'
import Main from '../Main/Main'
import RecordHeler from '../../../../helpers/recordHelper'

const AdminRecordGroup: FC = () => {
  const { recordGroup } = useTypedSelector(state => state.recordGroup)
  const { getRecordGroup } = useActions()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Получение параметров из query string
  const recordType = queryParams.get('recordType');
  const dateTime = queryParams.get('dateTime');
  const pickupTime = queryParams.get('pickupTime');
  useEffect(() => {
    const fetch = async () => {
      if (dateTime && recordType) {
        console.log(recordType,dateTime,pickupTime)
        const formattedDateTime = FormatDate.dateToSql(dateTime)
        let formattedpickupTime = pickupTime == 'null'?null: new Date(FormatDate.dateToSql(String(pickupTime)));
        await getRecordGroup(Number(recordType), new Date(formattedDateTime), formattedpickupTime);

      }
    }
    fetch()
  }, [])

  const pageTitle = `${RecordHeler.getNameByRecordType(recordGroup.recordType)}, ${recordGroup.user?.fullName}`
  return (
    <PageLayout title={pageTitle} questionMarkText='' topMenu={<TopMenu />}>
      <Main />
      <Helmet>
        <title>Bestellung</title>
      </Helmet>
    </PageLayout>
  )
}

export default AdminRecordGroup


