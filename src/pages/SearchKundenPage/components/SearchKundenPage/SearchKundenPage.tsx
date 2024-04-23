import React, { useEffect, useState } from 'react'
import PageLayout from '../../../../components/Layout/PageLayout/PageLayout'
import TopMenu from '../TopMenu/TopMenu'
import KundenList from '../KundenList/KundenList'
import { IUser } from '../../../../models/IUser'
import SearchKundenService from '../../api/SearchKundenService'
import { getErrorText } from '../../../../helpers/FormDataGeneration'
import { useActionData } from 'react-router-dom'
import { useActions } from '../../../../hooks/useActions'
import { Helmet } from 'react-helmet'

const SearchKundenPage = () => {
    const [userList,setUserList] = useState<IUser[]>([]);
    const {setGlobalError} = useActions()
    const [isLoading, setIsLoading] = useState<boolean>(false);
 
    const search = async (value:string)=>{
        try{
            setIsLoading(true)
            const {data} =  await SearchKundenService.findUsers(value);

            setUserList(data)
            setIsLoading(false)
        }catch(e){
            setIsLoading(false)
            console.log(e)
            setGlobalError(getErrorText(e))
        }  
       
    }
    
    useEffect(()=>{
      const fetch = async() =>{
        try{
          setIsLoading(true)
          const {data} =  await SearchKundenService.findUsers('all-all-all-all');
  
          setUserList(data)
          setIsLoading(false)
      }catch(e){
          setIsLoading(false)
          console.log(e)
          setGlobalError(getErrorText(e))
      }  
      }
      fetch()
    },[])
  const questionMarkText = `Die Seite "Kunden" ermöglicht die Suche nach Kunden und den Zugriff auf deren individuelle Profile.`
  return (
    <PageLayout title='Kunden' questionMarkText={questionMarkText}  topMenu ={<TopMenu onSearch = {search} />}>
      <KundenList userList ={userList} isLoading ={isLoading}/>
      <Helmet>
        <title>Kunden</title>
      </Helmet>
    </PageLayout> 
  )
}

export default SearchKundenPage
