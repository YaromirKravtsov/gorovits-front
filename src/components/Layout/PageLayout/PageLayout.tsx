import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import style from './PageLayout.module.css';
import QuestionMark from '../../../UI/QuestionMark/QuestionMark';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useLocation } from 'react-router-dom';
import Loader from '../../../UI/Loader/Loader';
interface PageLayoutProps {
  topMenu?: ReactNode;
  title: string;
  children: ReactNode;
  questionMarkText: string;
  flex?: boolean,
  mainStyle?: string
}

const PageLayout: FC<PageLayoutProps> = (props) => {
  const { setIsNavOpen, setWindowWidth, setWindowHight } = useActions()
  const {isNavOpen,windowHeight} = useTypedSelector(state => state.adaptive)

  const onClick = () =>{
    setIsNavOpen(!isNavOpen)
  }
  const topMenu = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLDivElement>(null);
  
  const [mainHeight, setMainHeight] = useState<number>();
  const location = useLocation()


  const [key, setKey] = useState(0);
  useEffect(() => {
    main.current?.addEventListener('scroll', handleScroll);
    if (main.current && topMenu.current) {
      setMainHeight(windowHeight - topMenu.current.offsetHeight);
    }
    return () => {
      main.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const [isLoading, setIsLoading] = useState(false);
  const handleScroll = () => {
    if (main.current&&main.current?.scrollTop <= -150) {
      setIsLoading(true);
      setKey(prevKey => prevKey + 1); 
      setTimeout(()=>{
        setIsLoading(false);
      },500)
    }else{
      setIsLoading(false);
    }
  };

  return (
    <div className={style.component}>
      <div className={`${style.topMenu} ${props.flex ? style.flex : ''}`} ref = {topMenu}>
        <div className={style.title} style = {{minWidth: location.pathname == '/besaitung-tuning'? '80%': ''}}>
          <div className={`${style.BurderMenuIcon} `} onClick={onClick} id ='BurgerMenuIcon'>
            <div className={style.line1}></div>
            <div className={style.line2}></div>
            <div className={style.line3}></div>
          </div>
          {props.title}</div>
        <div className={`${style.topMenuElemet}`}>
          <div style={{ marginLeft: "auto" }}></div>
          {props.topMenu}
          <QuestionMark text={props.questionMarkText} />

        </div>
      </div>
      <div className={`${style.main} ${props.mainStyle}`} ref = {main} style={{height: mainHeight }}>
        {isLoading&&<Loader size='small'/>}
        {!isLoading && 
           <> {props.children}</>
        }
   
      </div>
    </div>
  )
}

export default PageLayout
