import  { FC } from 'react'
import PageLayout from '../../../../components/Layout/PageLayout/PageLayout'
import TerminePageMain from '../TerminePageMain/TerminePageMain'
import { Helmet } from 'react-helmet'


const TerminePage:FC = () => {
  const questionText = 
  `
  Auf der Seite "Termine" kannst du alle aktuellen Termine einsehen und dich für einen "Werkstatt" oder "Beratung" Termin anmelden.
  `
  return (
    <div>
      <Helmet>
      <title>Termine</title>
    </Helmet>
         <PageLayout title = 'Termine' questionMarkText={questionText}>
              <TerminePageMain/>
        </PageLayout>
    </div>
  )
}

export default TerminePage
