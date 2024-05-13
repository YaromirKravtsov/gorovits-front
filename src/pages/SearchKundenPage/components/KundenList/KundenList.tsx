import React, { FC, useState } from 'react'
import { IUser } from '../../../../models/IUser'
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import style from './KundenList.module.css'
import BorderMenu from '../../../../UI/BorderMenu/BorderMenu';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../UI/Loader/Loader';
import KundenCard from '../KundenCard/KundenCard';
import MyPagination from '../../../../UI/MyPagination/MyPagination';
import SearchKundenService from '../../api/SearchKundenService';
interface Props {
/*   userList: IUser[],
  isLoading: boolean, */
  searchQuery: string
}

const KundenList: FC<Props> = (props) => {
  const [users,setUsers] = useState<IUser[]>([])
/*   if (props.isLoading) {
    return <Loader />
  }
  if (props.userList.length <= 0) {
    return <div className={style.error}>Es wurden keine Benutzer gefunden </div>
  } */

  return (
        <MyPagination
            fetchData={(page:number, itemsPerPage:number, searchQuery:string) =>  SearchKundenService.findUsers(page, itemsPerPage, searchQuery)}
            searchQuery={props.searchQuery}
            renderItem={user =>  <KundenCard user={user} />}
            itemsPerPage={12}
            className={style.main}
            list={users}
            setList={setUsers}
          />
  )
}

export default KundenList
