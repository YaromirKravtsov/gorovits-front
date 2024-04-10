import React from 'react'
import Racket from '../../../../modules/Racket/components/Racket/Racket'
import PageLayout from '../../../../components/Layout/PageLayout/PageLayout'
import { Helmet } from 'react-helmet'

const BesaitungAndTuning = () => {
  
  const querstionText = `
  Auf der Seite "Besaitung & Tuninng" werden alle Schläger, deren Bespannungen und Tuning-Optionen dargestellt. Zusätzlich gibt es die Möglichkeit, die Bespannungshistorie jedes Schlägers einzusehen.
  `
  return (
    <>
    <Helmet>
      <title>Besaitung & Tuninng</title>
    </Helmet>
    <PageLayout  title = 'Besaitung & Tuninng' questionMarkText={querstionText}>
        <Racket mode='user'/>
        </PageLayout>
    </>
  )
}

export default BesaitungAndTuning
