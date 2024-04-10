import { FC, useState } from "react"
import FlutterMenu from "../../../../UI/FlutterMenu/FlutterMenu"

import MyButton from "../../../../UI/MyButton/MyButton"

import style from './NewRackets.module.css'
import RacketsList from "../RacketsList/RacketsList"
import AddRacketMenu from "../AddRacketMenu/AddRacketMenu"
import Row from "../../../../components/Layout/Row/Row"
interface Props{
    editMode?: boolean
}

const NewRackets:FC<Props> = (props) => {
  const [isNewRacketOpen, setIsNewRacketOpen] = useState<boolean>(false)
  return (
    <>
        <FlutterMenu className={style.main} shadow='small'>
            <Row className={style.topRow}> 
                <div className={style.topTitle}>
                    Schläger
                </div>
                <MyButton className={style.topButton} mode='black' onClick={() => setIsNewRacketOpen(true)}>
                    Neuen Schläger hinzufügen
                </MyButton>
            </Row>
            <RacketsList editMode = {props.editMode? true: false}/>
        </FlutterMenu>
        {isNewRacketOpen&&
        <AddRacketMenu   onOpenChange = {setIsNewRacketOpen} editMode = {props.editMode? true: false}/>
        }
    </>
  )
}

export default NewRackets
