import React from 'react'
import PageLayout from '../../../components/Layout/PageLayout/PageLayout'
import TopMenu from './TopMenu/TopMenu'
import Main from './Main/Main'

const AdminSettingsPage = () => {
  return (
    <PageLayout title='Einstellungen' questionMarkText='' topMenu ={<TopMenu/>}>
      <Main/>
    </PageLayout>
  )
}

export default AdminSettingsPage
