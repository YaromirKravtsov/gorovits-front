import { FC, useEffect, useState } from 'react'
import style from './AppLayout.module.css'
import NavBar from '../../../app/components/NavBar/NavBar';
import Content from '../Content/Content';
import AppRouter from '../../../app/router/AppRouter';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { navBarAdaptive } from '../../../constants/adaptive';



const AppLayout: FC = () => {
  const [navBarWidth, setNavBarWidth] = useState<number>(450);
  const [navBarHeight, setNavBarHeight] = useState<number>(945);
  const [contentWidth, setContentWidth] = useState<number>();
  const [contentHeight, setContentHeight] = useState<number>(0);

  const { setIsNavOpen } = useActions()
  const { isNavOpen, windowHeight, windowWidth } = useTypedSelector(state => state.adaptive)
  useEffect(() => {
    if (windowWidth >= navBarAdaptive) {
      setContentWidth(windowWidth - navBarWidth)
    } else {
      setContentWidth(windowWidth)
    }


    setContentHeight(windowHeight)
  }, [navBarWidth, navBarHeight, windowWidth]);

  useEffect(() => {
    if (windowWidth <= navBarAdaptive && !isNavOpen) { // Добавлено условие !isNavOpen
      setIsNavOpen(false);
    } else if (windowWidth > navBarAdaptive && isNavOpen) { // Добавлено условие isNavOpen
      setIsNavOpen(true);
    }
  }, [windowWidth]);


  const handleClickOutside = (event: MouseEvent, isNavOpenL: boolean) => {
    const blockIds: string[] = ['nav-bar', 'BurgerMenuIcon'];
    const isOutside = blockIds.every((id: string) => {
      const blockElement = document.getElementById(id);
      return blockElement && !blockElement.contains(event.target as Node);
    });
    if (isOutside && windowWidth <= navBarAdaptive) {
      setIsNavOpen(false);
    }
  };


  useEffect(() => {

    document.addEventListener('click', e => handleClickOutside(e, isNavOpen));
    return () => {
      document.removeEventListener('click', e => handleClickOutside(e, isNavOpen));

    };
  }, []);



  return (
    <div className={`${style.app} ${isNavOpen && style.openNavBar}`} style={{ left: `${-navBarWidth}px` }}>



      <NavBar setWidth={setNavBarWidth} setHeight={setNavBarHeight} className={`${style.navBar}`} />

      <div className={style.content} style={{ height: contentHeight,width: contentWidth }} >
        <AppRouter />
      </div>


    </div>
  )
}

export default AppLayout
