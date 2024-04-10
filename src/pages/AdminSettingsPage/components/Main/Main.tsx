import { useState } from 'react';
import FoldingComponent from '../FoldingComponent/FoldingComponent'
import style from './Main.module.css';
import { AdminSettingPageService } from '../../api/AdminSettingPageService';
import { IRacket } from '../../models/IRacket';
import RacketCard from '../RacketCard/RacketCard';
import { useActions } from '../../../../hooks/useActions';
import MyPagination from '../../../../UI/MyPagination/MyPagination';


const Main = () => {
  const [isRacketAddOpen, setIsRacketOpen] = useState<boolean>(true);
  const [isStringAddOpen, setIsStringOpen] = useState<boolean>(false);
  
  const [isRacketsFoldering, setIsRacketsFoldering] = useState<boolean>(true);
  const [isStringsFoldering, setIsStringsFoldering] = useState<boolean>(false);
  const [racketsSearchQeuery, setRacketsSearchQeuery] = useState<string>('')
  const handelRacketsFoldering = () =>{
    if(isStringsFoldering){
      setIsStringsFoldering(false)
    } 
    setIsRacketsFoldering(!isRacketsFoldering);

  }
  const handelStringsFoldering = () =>{
    if(isRacketsFoldering){
      setIsRacketsFoldering(false)
    } 
    setIsStringsFoldering(!isStringsFoldering);

  }
  const onSearch = (value: string) => {

  }
   

  return (
    <div className={style.mainRow}>
      <FoldingComponent
        onSearch={onSearch}
        onAdd={() => setIsRacketOpen(true)}
        title='Schläger'
        isFolded={isRacketsFoldering}
        setIsFolded={handelRacketsFoldering}
      >
        <MyPagination
          fetchData={(page, itemsPerPage, searchQuery) => AdminSettingPageService.getRackets(page, itemsPerPage, searchQuery)}
          searchQuery={racketsSearchQeuery}
          renderItem={racket => <RacketCard racket={racket} key={racket.id} />}
          itemsPerPage={15}
          className={style.list}
        />
      </FoldingComponent>
      <FoldingComponent
        onSearch={onSearch}
        onAdd={() => setIsStringOpen(true)}
        title='Schläger'
        isFolded={isStringsFoldering}
        setIsFolded={handelStringsFoldering}
      >
        <MyPagination
          fetchData={(page, itemsPerPage, searchQuery) => AdminSettingPageService.getRackets(page, itemsPerPage, searchQuery)}
          searchQuery={racketsSearchQeuery}
          renderItem={racket => <RacketCard racket={racket} key={racket.id} />}
          itemsPerPage={15}
          className={style.list}
        />
      </FoldingComponent>
    </div>
  );
};

export default Main;
