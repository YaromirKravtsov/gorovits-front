import React, { useEffect, useState } from 'react'
import PageLayout from '../../../components/Layout/PageLayout/PageLayout'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useLocation } from 'react-router-dom'
import TopMenu from './TopMenu/TopMenu'
import UserRecords from '../../../modules/UserRecords/components/UserRecords/UserRecords'
import UserRecordsUsers from '../../../modules/UserRecords/components/UserRecordsUsers/UserRecordsUsers'
import { useActions } from '../../../hooks/useActions'
import style from './UserRecordsStoryPage.module.css'
import UserRecordsAdmin from '../../../modules/UserRecords/components/UserRecordsAdmin/UserRecordsAdmin';

const UserRecordsStoryPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { setUser } = useActions()
    // Получение параметров из query string
    const userId = queryParams.get('userId');
    const fullName = queryParams.get('fullName');
    const [state,setState] = useState<number>(1)
    const [searchQuery,setSearchQuery] = useState<string>('');

    useEffect(() => {
        setUser({
            userId: Number(userId),
            fullName: String(fullName)
        });

        const storedState = localStorage.getItem('storyState');
        const storedQuery = localStorage.getItem('storyQuery');
        
        if (storedState !== null) {
            setState(Number(storedState));
        }

        if (storedQuery !== null) {
            setSearchQuery(storedQuery);
        }
    }, [userId, fullName]);

    useEffect(() => {
        if (state !== null) {
            localStorage.setItem('storyState', String(state));
        }

        localStorage.setItem('storyQuery', searchQuery);
    }, [state, searchQuery]);

    useEffect(() => {
        console.log('state:', state);
        console.log('searchQuery:', searchQuery);
    }, [state, searchQuery]);

    return (
        <PageLayout title={`${fullName} Bestellungen`} questionMarkText='' flex topMenu ={
            <TopMenu state = {state} setState = {setState} setSearchQuery = {setSearchQuery}
            />}>
            <div className={style.main}>

               <UserRecordsAdmin searchQuery={searchQuery} state={state} isToSpecificUser/>
            </div>
        </PageLayout>
    )
}

export default UserRecordsStoryPage
