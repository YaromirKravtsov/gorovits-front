import React from 'react'
import PageLayout from '../../../components/Layout/PageLayout/PageLayout'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useLocation } from 'react-router-dom'
import TopMenu from './TopMenu/TopMenu'
import UserRecords from '../../../modules/UserRecords/components/UserRecords/UserRecords'

const UserRecordsStoryPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Получение параметров из query string
    const userId = queryParams.get('userId');
    const fullName = queryParams.get('fullName');
    return (
        <PageLayout title={`${fullName} Bestellungen`} questionMarkText='' topMenu ={<TopMenu userId ={Number(userId)}/>} flex>
             <UserRecords toUser/>
        </PageLayout>
    )
}

export default UserRecordsStoryPage
