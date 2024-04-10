import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageLayout from '../../../../components/Layout/PageLayout/PageLayout'
import Personalnformation from '../../../../modules/PersonalInfo/PersonalInformation/PersonalInformation';
import { IUser } from '../../../../models/IUser';
import { AccountService } from '../../api/AccountService';
import Main from '../Main/Main';

const AccountPageToAdmin:FC = () => {

  const questionMarkText= `
  Auf der Kundenkonto-Seite finden Sie Informationen über den Kunden, seine Schläger, Tunings 
  und Besaitungen sowie seine Bestellhistorie, aktuelle Bestellungen und die Möglichkeit, 
  das Konto dieses Benutzers zu löschen.`
  return (
    <div>
      <PageLayout title = 'Kundenkonto' questionMarkText={questionMarkText}>
        <Main/>
      </PageLayout>
    </div>
  )
}

export default AccountPageToAdmin
