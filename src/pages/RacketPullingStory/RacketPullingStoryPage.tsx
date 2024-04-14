import React from 'react'
import PageLayout from '../../components/Layout/PageLayout/PageLayout'
import { Helmet } from 'react-helmet'
import TerminePageMain from '../TerminePage/components/TerminePageMain/TerminePageMain'
import { useParams } from 'react-router'
import PullingStory from '../../modules/PullingStory/components/PullingStory/PullingStory'
import RateMenu from '../../modules/PullingStory/components/RateMenu/RateMenu'
import { useLocation } from 'react-router-dom';

const RacketPullingStoryPage = () => {

    const questionText = `
      
    `;
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const number = params.get('number');
  return (
    <>
    <Helmet>
    <title>Termine</title>
    </Helmet>
       <PageLayout title = {`Besaitungsverlauf für Schläger Nr. ${number}`} questionMarkText={questionText}>
            <PullingStory type='racketStory' />
      </PageLayout>
      <RateMenu/>
    </>
   
  )
}

export default RacketPullingStoryPage
