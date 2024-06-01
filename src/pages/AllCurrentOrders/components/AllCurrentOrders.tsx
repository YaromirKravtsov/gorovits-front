import React,{ FC, useState } from "react"
import PageLayout from "../../../components/Layout/PageLayout/PageLayout"
import { Helmet } from "react-helmet"
import TopMenu from "./TopMenu/TopMenu"
import UserRecords from "../../../modules/UserRecords/components/UserRecords/UserRecords"
import { useTypedSelector } from "../../../hooks/useTypedSelector"
import UserRecordsAdmin from "../../../modules/UserRecords/components/UserRecordsAdmin/UserRecordsAdmin"

const AllCurrentOrders:FC = () => {

  const [state,setState] = useState<number>(1);
  const [searchQuery,setSearchQuery] = useState<string>('');
  const questionMarkText = `Die Seite "Aktuelle Aufträge" zeigt alle aktuellen Aktuelle Aufträge an und ermöglicht es, deren Status zu aktualisieren und weitere Informationen darüber zu erhalten.  `
  
  return (
    <PageLayout title="Aktuelle Aufträge" questionMarkText={questionMarkText} flex topMenu ={
    <TopMenu state = {state} setState = {setState} setSearchQuery = {setSearchQuery}
    />}>
        <UserRecordsAdmin state = {state} searchQuery = {searchQuery}/>
        <Helmet>
        <title>Aktuelle Aufträge</title>
      </Helmet>
    </PageLayout>
  )
}

export default AllCurrentOrders
