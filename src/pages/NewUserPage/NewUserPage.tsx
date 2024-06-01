import React, { useEffect, useState } from 'react'
import PageLayout from '../../components/Layout/PageLayout/PageLayout'
import TopMenu from './components/TopMenu/TopMenu'
import Main from './components/Main/Main'
import { Helmet } from 'react-helmet'
import { useActions } from '../../hooks/useActions'
import { SelectedImage } from '../../components/PhotoSelection/PhotoSelection'
import { ISUser } from '../../models/IUser'

const NewUserPage = () => {
  const [newUserPhoto,setNewUserPhoto] = useState<any>();
  const {setNewRackets} = useActions()
  useEffect(()=>{
    setNewRackets([]);
  },[])
  const questionMarkText= `Auf der Seite "Neuer Benutzer" können Sie einen neuen Benutzer registrieren, Informationen über sein Profil angeben, ein Profilbild hochladen und Schläger hinzufügen.  `
  
  const [userInfo,setUserInfo] = useState<ISUser>({
    email: '',
    fullName: '',
    phoneNumber: ''
  });
  
  return (
    <>
    <PageLayout title = 'Neuer Benutzer' questionMarkText={questionMarkText} topMenu ={<TopMenu photo ={newUserPhoto} userInfo = {userInfo} />} >
        <Main onPhotoChange ={(value: SelectedImage)=> setNewUserPhoto(value)} setUserInfo = {setUserInfo}/>
    </PageLayout>
    <Helmet>
        <title>Neuer Benutzer</title>
    </Helmet>
    </>
  )
}

export default NewUserPage
