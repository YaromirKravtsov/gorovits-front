import React, { FC } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import UserRecordsUsers from '../UserRecordsUsers/UserRecordsUsers';
import UserRecordsAdmin from '../UserRecordsAdmin/UserRecordsAdmin';
import { RrcordsSearchParams } from '../../../../app/state/auth/types';
interface Props {
  toUser?: boolean
}
const UserRecords: FC<Props> = () => {
  const { role } = useTypedSelector(state => state.user);


  return (
    <>
      {role == 'user' &&
        <UserRecordsUsers />
      }
            {role == 'admin' &&
        <>
          <UserRecordsAdmin toUser/>
        </>
}
    </>
  )
}

export default UserRecords
