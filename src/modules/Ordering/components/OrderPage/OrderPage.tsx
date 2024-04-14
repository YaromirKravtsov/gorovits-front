import React, { useState } from 'react'
import PageLayout from '../../../../components/Layout/PageLayout/PageLayout'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import RecordHeler from '../../../../helpers/recordHelper'
import { useParams } from 'react-router-dom'
import style from './OrderPage.module.css'
const OrderPage = () => {
  const { type } = useParams()
  console.log(type)
  const orderingComponent = RecordHeler.getOrderingByType(Number(type));


  return (
    <div>
      <PageLayout title={`Terminbuchung`} questionMarkText=''>
        <div className={style.main}>
          {
            orderingComponent && React.createElement(orderingComponent, { type: Number(type) })
          }
        </div>
      </PageLayout>
    </div>
  )
}

export default OrderPage
