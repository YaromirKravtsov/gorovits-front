import React, { FC, useState } from 'react'
import PullingCard from '../../../../components/PullingCard/PullingCard';
import LastPulling from '../LastPulling/LastPulling';
import PullingUserStory from '../PullingUserStory/PullingUserStory';
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import RateMenu from '../RateMenu/RateMenu';
import PullingRacketStory from '../PullingRacketStory/PullingRacketStory';
type PullingType = 'racketStory' | 'userStory'|'last' ;
interface Props{
    type: PullingType,
}
const PullingStory:FC<Props> = (props) => {


  return (
    <>
        {props.type =='last'&&
          <LastPulling />
        }
        {props.type =='userStory'&&
          <PullingUserStory />
        }
      {props.type =='racketStory'&&
          <PullingRacketStory />
        }
     
     

    </>
  )
}

export default PullingStory
