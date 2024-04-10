import React,{ FC, useState } from "react"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import { Helmet } from "react-helmet"
import TopMenu from "./TopMenu/TopMenu"
import UserRecords from "../../../modules/UserRecords/components/UserRecords/UserRecords"
import { useTypedSelector } from "../../../hooks/useTypedSelector"

const AllCurrentOrders:FC = () => {

  const [state,setState] = useState<number>(1);
  
  const questionMarkText = `Die Seite "Bestellungen" zeigt alle aktuellen Bestellungen an und ermöglicht es, deren Status zu aktualisieren und weitere Informationen darüber zu erhalten.  `
 
  return (
    <PageLayout title="Bestellungen" questionMarkText={questionMarkText} flex topMenu ={
    <TopMenu state = {state} setState = {setState} 
    />}>
        <UserRecords />
        <Helmet>
        <title>Bestellungen</title>
      </Helmet>
    </PageLayout>
  )
}

export default AllCurrentOrders
