import React, { FC } from 'react'
import Personalnformation from '../../../../modules/PersonalInfo/PersonalInformation/PersonalInformation'
import style from './Main.module.css'
import Row from '../../../../components/Layout/Row/Row'
import UserPhoto from '../../../../components/UserPhoto/UserPhoto'
import NewRackets from '../../../../modules/NewRackets/components/NewRackets/NewRackets'
import { IUser } from '../../../../models/IUser'
import { SelectedImage } from '../../../../components/PhotoSelection/PhotoSelection'

interface Props {
    onPhotoChange: (value: SelectedImage) => void
}
const Main: FC<Props> = (props) => {

    return (
        <div className={style.main}>
            <Row className={style.topRow}>
                <Personalnformation isEditing={true} />
                <UserPhoto onChange={(value: SelectedImage) => props.onPhotoChange(value)} isEdditing />
            </Row>
            <NewRackets />
        </div>
    )
}

export default Main
