
import React, { FC, LegacyRef, useEffect, useState } from 'react'

import logo from '../../../assets/images/logo.png'
import style from './NavBar.module.css'
import ptIcon from '../../../assets/images/tennistachse.png'
import newUserIcon from '../../../assets/images/admin/new-user-icon.png'
import termineIcon from '../../../assets/images/termine-icon.png'
import { RouteNames } from '../../router'
import MyImage from '../../../UI/MyImage/MyImage'
import coreLogoIcon from '../../../assets/images/core-logo-icon.png'
import shopIcon from '../../../assets/images/shop-icon.png'
import settingsIcon from '../../../assets/images/settings-logo.png'
import kundenIcon from '../../../assets/images/kunden-icon.png'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import Sidebar from '../../../components/Layout/Sidebar/Sidebar'
import SidebarItem from '../../../components/Layout/Sidebar/SidebarItem/SidebarItem'
import SiderBottomMenu from '../../../components/Layout/Sidebar/SliderBottomMenu/SiderBottomMenu'
import { useActions } from '../../../hooks/useActions'
import { useLocation, useNavigate } from 'react-router-dom'
import { classicNameResolver } from 'typescript'
interface Props{
  setWidth: (value:number) => void,
  setHeight: (value:number) => void,
  className:string
}
const NavBar: FC<Props> = ({setWidth,className,setHeight}) => {
  const { userInfo, photoLink, role } = useTypedSelector(state => state.user);
  const [navBarActiveItem,setNavBarActiveItem] = useState('');
  const location = useLocation();
  useEffect(() => {
    setNavBarActiveItem(location.pathname);
    
  }, [location.pathname])
  
  return (
    <Sidebar  setWidth = {setWidth} setHeight ={setHeight} className ={className}>
      <MyImage src={logo} alt='Gorovits logo'  className={style.logo} />
      {role == 'user' &&
        <>
          <SidebarItem text='Tennistasche' src={ptIcon} rout={RouteNames.BESAITUNG_AND_TUNING}
            isActive={navBarActiveItem === '/besaitung-tuning'}
            imageClassName = {style.rackets}
          />
          <SidebarItem text='Termine' src={termineIcon} rout={RouteNames.TERMINE}
            isActive={navBarActiveItem === '/termine'}

          />
          <SiderBottomMenu
            firstComponent={
              <SidebarItem text='SHOP' src={shopIcon} rout={'https://core-custom.com/'}
                isActive={false}
                imgText={coreLogoIcon}
              />
            }
            secondComponent={
              <SidebarItem text={userInfo.fullName} src={ptIcon} rout={RouteNames.LOGIN}
                isActive={navBarActiveItem === '/account'}
                profileImage={photoLink}
              />
            } />
        </>
      }
      {role == 'admin' &&
        <>
          <SidebarItem text='Neuer Benutzer' src={newUserIcon} rout={RouteNames.KUNDENKONTO}
            isActive={navBarActiveItem === '/neuer-benutzer'}
          />
          <SidebarItem text='Aktuelle Aufträge' src={termineIcon} rout={RouteNames.ALL_CURRENT_ORDERS}
            isActive={navBarActiveItem === '/current-orders'}
          />
          <SidebarItem text='Kunden' src={kundenIcon} rout={RouteNames.SEARCH_KUNDEN}
            isActive={navBarActiveItem === '/kunden'}
          />

          <SidebarItem text='Einstellungen' src={settingsIcon} rout={RouteNames.EINSTELLUNGEN}
            isActive={navBarActiveItem === '/einstellungen'}
          />
        </>
      }

    </Sidebar>
  )
}

export default NavBar