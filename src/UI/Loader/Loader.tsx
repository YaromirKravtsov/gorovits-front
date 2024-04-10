import  { FC } from 'react'
import style from './Loader.module.css'
import MyImage from '../MyImage/MyImage'
import loaderIcon from '../../assets/images/loader-icon.png'
const Loader:FC = () => {
  return (
    <div className={style.loader}>
        <MyImage alt='' src ={loaderIcon} className={style.LoaderIcon}/>
    </div>
  )
}

export default Loader
