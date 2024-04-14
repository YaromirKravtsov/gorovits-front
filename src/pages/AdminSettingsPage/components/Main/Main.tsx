import { useState } from 'react';
import FoldingComponent from '../FoldingComponent/FoldingComponent'
import style from './Main.module.css';
import { AdminSettingPageService } from '../../api/AdminSettingPageService';
import { IRacket } from '../../models/IRacket';
import RacketCard from '../RacketCard/RacketCard';
import { useActions } from '../../../../hooks/useActions';
import MyPagination from '../../../../UI/MyPagination/MyPagination';
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import RacketFlutterMenu from '../RacketFlutterMenu/RacketFlutterMenu';
import { getErrorText } from '../../../../helpers/FormDataGeneration';
import { DataActions } from '../../../../helpers/DataActions';
import StringCard from '../StringCard/StringCard';
import { IString } from '../../models/IString';
import StringFlutterMenu from '../StringFlutterMenu/StringFlutterMenu';


const Main = () => {
  const [isRacketAddOpen, setIsRacketOpen] = useState<boolean>(false);
  const [isStringAddOpen, setIsStringOpen] = useState<boolean>(false);
  const [isRacketsFoldering, setIsRacketsFoldering] = useState<boolean>(true);
  const [isStringsFoldering, setIsStringsFoldering] = useState<boolean>(false);
  const [racketsSearchQeuery, setRacketsSearchQeuery] = useState<string>('')
  const [stringsSearchQeuery, setStringsSearchQeuery] = useState<string>('')
  const { setGlobalError } = useActions();

  const [rackets, setRackets] = useState<IRacket[]>([]);
  const [strings, setStrings] = useState<IString[]>([]);
  const handelRacketsFoldering = () => {
    if (isStringsFoldering) {
      setIsStringsFoldering(false)
    }
    setIsRacketsFoldering(!isRacketsFoldering);
  }
  const handelStringsFoldering = () => {
    if (isRacketsFoldering) {
      setIsRacketsFoldering(false)
    }
    setIsStringsFoldering(!isStringsFoldering);
  }
  const handelRacketDelete = async (id: number) => {
    try {
      await AdminSettingPageService.deleteModel(id);
      const data = DataActions.deleteById(rackets, id)
      console.log(data)
      setRackets(data)
    } catch (error) {
      setGlobalError(getErrorText(error))
    }
  }

  const handelStringDelete = async (id: number) => {
    try {
      await AdminSettingPageService.deleteString(id);
      const data = DataActions.deleteById(strings, id)
      console.log(data)
      setStrings(data)
    } catch (error) {
      setGlobalError(getErrorText(error))
    }
  }
  const handelRacketEdit = (racket: IRacket) => {
    console.log(racket)
    const data = DataActions.update(rackets, racket)

    setRackets(data);
  }
  const handelStringEdit = (string: IString)=>{
    const data = DataActions.update(strings, string)
    setStrings(data);
  }
  const handelRacketAdd = (racket:IRacket) =>{
    const data = DataActions.addToStart(rackets, racket)
    setRackets(data);
  }
  const handelStringAdd = (racket:IRacket) =>{
    const data = DataActions.addToStart(rackets, racket)
    console.log(racket)
    console.log(data)
    setStrings(data);
  }

  return (

    <>
      {isRacketAddOpen &&
        <RacketFlutterMenu action='add' setIsOpen={setIsRacketOpen} handelAdd = {handelRacketAdd}/>
      }
          {isStringAddOpen &&
        <StringFlutterMenu action='add' setIsOpen={setIsStringOpen} handelAdd = {handelStringAdd}/>
      }
      <div className={style.mainRow}>
        <FoldingComponent
          onSearch={setRacketsSearchQeuery}
          onAdd={() => setIsRacketOpen(true)}
          title='Schläger'
          isFolded={isRacketsFoldering}
          setIsFolded={handelRacketsFoldering}
        >
          <MyPagination
            fetchData={(page, itemsPerPage, searchQuery) => AdminSettingPageService.getRackets(page, itemsPerPage, searchQuery)}
            searchQuery={racketsSearchQeuery}
            renderItem={racket => <RacketCard racket={racket} key={racket.id} handelDelete={handelRacketDelete} handelEdit={handelRacketEdit} />}
            itemsPerPage={9}
            className={style.list}
            list={rackets}
            setList={setRackets}
          />
        </FoldingComponent>

        <FoldingComponent
          onSearch={setStringsSearchQeuery}
          onAdd={() => setIsStringOpen(true)}
          title='Seiten'
          isFolded={isStringsFoldering}
          setIsFolded={handelStringsFoldering}
        >
          <MyPagination
            fetchData={(page, itemsPerPage, searchQuery) => AdminSettingPageService.getStrings(page, itemsPerPage, searchQuery)}
            searchQuery={stringsSearchQeuery}
            renderItem={string => <StringCard string={string} key={string.id} handelDelete={handelStringDelete}handelEdit ={handelStringEdit} />}
            itemsPerPage={12}
            className={style.list}
            list={strings}
            setList={setStrings}
          />
        </FoldingComponent>
      </div>
    </>

  );
};

export default Main;
