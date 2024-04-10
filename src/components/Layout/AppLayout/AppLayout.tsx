import  { FC, ReactNode } from 'react'
import style from './AppLayout.module.css'
interface AppLayoutProps {
  children: ReactNode; // ReactNode поддерживает элементы, строки, числа, фрагменты и т.д.
}


const AppLayout:FC<AppLayoutProps> = ({children}) => {
  return (
    <div className={style.app}>
      {children}
    </div>
  )
}

export default AppLayout
