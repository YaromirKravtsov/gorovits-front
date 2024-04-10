import { FC, useState } from "react"
import FlutterMenu from "../../../../UI/FlutterMenu/FlutterMenu"
import style from './DeleteRecordMenu.module.css'
import Row from "../../../../components/Layout/Row/Row"
import MyButton from "../../../../UI/MyButton/MyButton"
interface Props{
    setIsOpen: (value:boolean) => void,
    onDelete: () => void,
}
const DeleteRecordMenu:FC<Props> = (props) => {
    const handelDelete = () =>{
        props.setIsOpen(false)
        props.onDelete();
    }

  return (
    <FlutterMenu shadow="all" className={style.menu}>
        <div className={style.title}>
            Auftrag stornieren
        </div>
        <div className={style.text}>
            Möchtest du diesen Auftrag wirklich stornieren?
        </div>
        <Row className={style.buttonRow}>
            <MyButton className={style.button} mode='white' border onClick={() => props.setIsOpen(false)}>
                Abbrechen
            </MyButton>
            <MyButton className={style.button} mode='black' onClick={handelDelete}>
                Stornieren
            </MyButton>
        </Row>
    </FlutterMenu>
  )
}

export default DeleteRecordMenu
