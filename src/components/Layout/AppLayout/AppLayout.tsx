import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import style from './AppLayout.module.css'
import NavBar from '../../../app/components/NavBar/NavBar';
import Content from '../Content/Content';
import AppRouter from '../../../app/router/AppRouter';



const AppLayout: FC = () => {
  const [navBarWidth,setNavBarWidth] = useState<number>(450); 
  const [navBarHeight,setNavBarHeight] = useState<number>(945); 
  const [contentWidth,setContentWidth] = useState<number>(); 
  const [contentHeight,setContentHeight] = useState<number>(0); 
  useEffect(() => {
   console.log(navBarWidth)
   setContentWidth(window.innerWidth - navBarWidth)
   setContentHeight(navBarHeight)
  }, [navBarWidth,navBarHeight]);
  return (
    <div className={style.app}>
      <NavBar setWidth = {setNavBarWidth} setHeight = {setNavBarHeight} className ={style.navBar}/>
      <Content className={style.content} topStyle = {{width: contentWidth,height: contentHeight}}>
        <AppRouter />
      </Content>
    </div>
  )
}

export default AppLayout
