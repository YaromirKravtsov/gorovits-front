import React from 'react'
import { Helmet } from 'react-helmet'
import PageLayout from '../../../../components/Layout/PageLayout/PageLayout'
import TopMenu from '../TopMenu/TopMenu'
import PullingStory from '../../../../modules/PullingStory/components/PullingStory/PullingStory'
import RateMenu from '../../../../modules/PullingStory/components/RateMenu/RateMenu'

const UserPullingHistory = () => {
  const pageText = `
  Auf der Seite "Besaitung für alle Schläger" finden Sie eine Übersicht über die Bespannungen für alle Ihre Schläger.
  `
  return (
    <>
          <RateMenu/>
       <Helmet>
      <title>Besaitungsverlauf</title>
    </Helmet>
    <PageLayout topMenu ={<TopMenu/>} title = 'Besaitungsverlauf für Schläger' questionMarkText={pageText}>
          <PullingStory type='userStory' />
        </PageLayout>
    </>
  )
}

export default UserPullingHistory
