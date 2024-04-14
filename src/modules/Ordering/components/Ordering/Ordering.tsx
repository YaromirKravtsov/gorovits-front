import React, { FC, useEffect, useState } from 'react'
import RecordHeler from '../../../../helpers/recordHelper';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
import { useNavigate } from 'react-router-dom';


interface OrderingProps {
  recordType: number;
}

const Ordering: FC<OrderingProps> = ({ recordType }) => {
  const { isOpen } = useTypedSelector(state => state.order)
  const { windowWidth } = useTypedSelector(state => state.adaptive)
  const orderingComponent = RecordHeler.getOrderingByType(recordType);
  
  const navigate = useNavigate()
  useEffect(()=>{
  /*   if(isOpen && windowWidth <= 600){
        navigate(`/terminbuchung/${recordType}`)
    } */
  },[isOpen])
  return (
    <div>
      {isOpen &&
        orderingComponent && React.createElement(orderingComponent, { type: recordType })
      }
 
    </div>
  );
};


export default Ordering
