import React from 'react'
import PageLayout from '../../../../components/Layout/PageLayout/PageLayout'
import { Helmet } from 'react-helmet'
import style from './BesaitungAndTuning.module.css'
import UserRacketsRow from '../../../../modules/Racket/components/UserRacketsRow/UserRacketsRow'
const BesaitungAndTuning = () => {
  
  const querstionText = `
  Auf der Seite "Tennistasche" werden alle Schläger, deren Bespannungen und Tuning-Optionen dargestellt. Zusätzlich gibt es die Möglichkeit, die Bespannungshistorie jedes Schlägers einzusehen.
  `
  return (
    <>
    <Helmet>
      <title>Tennistasche</title>
    </Helmet>
    <PageLayout  title = 'Tennistasche' questionMarkText={querstionText} mainStyle={style.main}>
        <UserRacketsRow/>
        </PageLayout>
    </>
  )
}

export default BesaitungAndTuning
