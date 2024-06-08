import React, { useEffect } from 'react'
import PageLayout from '../../../components/Layout/PageLayout/PageLayout'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useLocation } from 'react-router-dom'
import TopMenu from './TopMenu/TopMenu'
import UserRecords from '../../../modules/UserRecords/components/UserRecords/UserRecords'
import UserRecordsUsers from '../../../modules/UserRecords/components/UserRecordsUsers/UserRecordsUsers'
import { useActions } from '../../../hooks/useActions'

const UserRecordsStoryPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const {setUser} = useActions()
    // Получение параметров из query string
    const userId = queryParams.get('userId');
    const fullName = queryParams.get('fullName');


    useEffect(()=>{
        setUser({
            userId: Number(userId),
            fullName: String(fullName)
          })
    },[])
    return (
        <PageLayout title={`${fullName} Bestellungen`} questionMarkText=''/*  topMenu ={<TopMenu userId ={Number(userId)}/>} */ flex>
         {/*     <UserRecords toUser/> */}
         <UserRecordsUsers state='all'/>
        </PageLayout>
    )
}

export default UserRecordsStoryPage
