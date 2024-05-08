import { FC } from 'react'
import PageLayout from '../../../../components/Layout/PageLayout/PageLayout';
import KundenKontoTopMenu from '../KundenKontoTopMenu/KundenKontoTopMenu';
import { Helmet } from 'react-helmet';
import Main from '../Main/Main';

const KundenkontoPage: FC = () => {
  const pageText = 'Auf der Seite "Dein Kundenkonto" kannst du dein Profilbild, deinen Namen, deine E-Mail-Adresse und Telefonnummer sowie deine aktuellen Themen und Laufzeiten ohne iTunes anzeigen. Außerdem kannst du dein Passwort ändern und deine Benutzerinformationen aktualisieren.'
  return (
    <>
      <Helmet>
        <title>Dein Kundenkonto</title>
      </Helmet>
      <PageLayout topMenu={<KundenKontoTopMenu />} title='Dein Kundenkonto' questionMarkText={pageText}>
        <Main />
      </PageLayout>

      
    </>

  )
}

export default KundenkontoPage;
