import React from 'react'
import PageLayout from '../../components/Layout/PageLayout/PageLayout'
import { Helmet } from 'react-helmet'
import TerminePageMain from '../TerminePage/components/TerminePageMain/TerminePageMain'
import { useParams } from 'react-router'
import PullingStory from '../../modules/PullingStory/components/PullingStory/PullingStory'
import RateMenu from '../../modules/PullingStory/components/RateMenu/RateMenu'

const RacketPullingStoryPage = () => {
  const { id } = useParams();
    const questionText = `
      
    `;
  return (
    <>
    <Helmet>
    <title>Termine</title>
    </Helmet>
       <PageLayout title = 'Besaitungsverlauf für Schläger' questionMarkText={questionText}>
            <PullingStory type='racketStory' />
      </PageLayout>
      <RateMenu/>
    </>
   
  )
}

export default RacketPullingStoryPage
