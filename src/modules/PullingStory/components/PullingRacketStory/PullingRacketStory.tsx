import { FC, useEffect } from 'react'
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '../../../../hooks/useActions';
import PullingCard from '../../../../components/PullingCard/PullingCard';
import Loader from '../../../../UI/Loader/Loader';
import style from './PullingRacketStory.module.css'
import { useLocation } from 'react-router';

const PullingRacketStory: FC = () => {
  /*     const {userInfo} = useTypedSelector(state=> state.user); */
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const { pullings, isLoaded } = useTypedSelector(state => state.pulling);
  const { setRatingPillingId, setIsInRating, getRacketPullings } = useActions();
  useEffect(() => {
    const fetch = async () => {
      await getRacketPullings(Number(id));
    }
    fetch()
  }, [Number(id)])

  const onRate = (pullingId: number) => {
    setRatingPillingId(pullingId);
    setIsInRating(true)
  }

  return (
    <div className={style.pullingsRow}>
      {isLoaded ?
        <>
          {pullings.length == 0 ?
            <div className={style.noRecords}>Sie haben noch keine Bespannungen</div>
            :
            <>
              {pullings.map(pulling =>
                <PullingCard key={pulling.id} pulling={pulling} type='racketStory' onRate={() => onRate(pulling.id)} />
              )}
            </>
          }
        </>
        :
        <Loader />
      }

    </div>
  )
}

export default PullingRacketStory
