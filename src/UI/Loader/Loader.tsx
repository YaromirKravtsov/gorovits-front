import  { FC } from 'react'
import style from './Loader.module.css'
import MyImage from '../MyImage/MyImage'
import loaderIcon from '../../assets/images/loader-icon.png'
type Size = 'small' | 'large'
interface Props{
  size?:Size
}
const Loader:FC<Props> = ({size = 'large'}) => {
  return (
    <div className={`${style.loader} ${size == 'small'&& style.loaderSmal}`}>
        <MyImage alt='' src ={loaderIcon} className={style.LoaderIcon}/>
    </div>
  )
}

export default Loader
