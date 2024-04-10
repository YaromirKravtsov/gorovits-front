import React, { FC, useEffect, useState } from 'react'
import RecordHeler from '../../../../helpers/recordHelper';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';


interface OrderingProps {
  recordType: number;
}

const Ordering: FC<OrderingProps> = ({ recordType }) => {
  const {isOpen} = useTypedSelector(state=> state.order)
  const orderingComponent = RecordHeler.getOrderingByType(recordType);
  
  return (
      <div>
          {isOpen&&
             orderingComponent && React.createElement(orderingComponent,{type:recordType})
          }
    
        
      </div>
  );
};


export default Ordering
