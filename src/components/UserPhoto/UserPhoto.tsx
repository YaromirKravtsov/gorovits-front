import { FC, useEffect, useState } from 'react'
import style from './UserPhoto.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import FlutterMenu from '../../UI/FlutterMenu/FlutterMenu'
import MyImage from '../../UI/MyImage/MyImage'
import MyButton from '../../UI/MyButton/MyButton'
import PhotoSelection, { SelectedImage } from '../PhotoSelection/PhotoSelection'
import DimOverlay from '../../UI/DimOverlay/DimOverlay'

interface Props {
  onChange?: (value: SelectedImage) => void,
  isEdditing?: boolean,
  className?: string
}
const UserPhoto: FC<Props> = (props) => {
  const { photoLink, isEditing } = useTypedSelector(state => state.user)

  const [flutterIsOpen, setFlutterIsOpen] = useState<boolean>(false);
  useEffect(() => {
    if (props.isEdditing) {
      setFlutterIsOpen(true)
    }
  }, [])
  if (props.isEdditing) {
    return (
      <PhotoSelection setIsOpen={setFlutterIsOpen} shadow='admin' onSelect={(value: SelectedImage) => props.onChange && props.onChange(value)} />
    )
  }
  return (
    <>
      <FlutterMenu shadow='small' className={`${style.flutter} ${props.className}`} >
        <MyImage alt='user profile image' src={photoLink} className={style.img} />
        {isEditing &&
          <DimOverlay className={style.dim}>
            <MyButton className={style.editButton} onClick={() => setFlutterIsOpen(true)}>Foto ändern</MyButton>
          </DimOverlay>
        }

      </FlutterMenu>

      {flutterIsOpen &&
        <PhotoSelection setIsOpen={setFlutterIsOpen} shadow='all' />
      }

    </>
  )
}

export default UserPhoto
