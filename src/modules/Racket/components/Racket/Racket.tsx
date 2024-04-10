import React, { FC } from 'react';
import UserRacketsRow from '../UserRacketsRow/UserRacketsRow';
type RacketComponentMode = 'user' | 'admin to create' | 'admin to view  and edit' 
interface Props{
    mode: RacketComponentMode
}
const Racket:FC<Props> = (props) => {
  return (
    <>
    {props.mode == 'user' &&
        <UserRacketsRow/>
    }
       
    </>
  )
}

export default Racket
