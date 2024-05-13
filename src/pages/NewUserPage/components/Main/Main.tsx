import React, { FC, useEffect, useState } from 'react'
import Personalnformation from '../../../../modules/PersonalInfo/PersonalInformation/PersonalInformation'
import style from './Main.module.css'
import Row from '../../../../components/Layout/Row/Row'
import UserPhoto from '../../../../components/UserPhoto/UserPhoto'
import NewRackets from '../../../../modules/NewRackets/components/NewRackets/NewRackets'
import { ISUser, IUser } from '../../../../models/IUser'
import PhotoSelection, { SelectedImage } from '../../../../components/PhotoSelection/PhotoSelection'
import InputRow from '../../../../components/InputRow/InputRow'
import MyInput from '../../../../components/MyInput/MyInput'

interface Props {
    onPhotoChange: (value: SelectedImage) => void,
    setUserInfo: (value: ISUser) => void
}
const Main: FC<Props> = (props) => {
    const [email,setEmail] = useState<string>('');
    const [fullName,setFullName] = useState<string>('');
    const [phoneNumber,setPhoneNumber] = useState<string>('');


    useEffect(()=>{
        props.setUserInfo({
            email, fullName,phoneNumber
        })
        console.log(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email))
    },[email,fullName, phoneNumber])
    return (
        <div className={style.main}>
            <Row className={style.topRow}>
                <div className={style.userInfo}>
                    <InputRow label='Name' className={style.inputRow} labelClass={style.label}>
                        <MyInput className={style.input} value={fullName} onChange={setFullName} placeholder='Name eingeben'/>
                    </InputRow>
                    <InputRow label='Email' className={style.inputRow} labelClass={style.label}>
                        <MyInput className={style.input} value={email} onChange={setEmail} placeholder='Email eingeben'/>
                    </InputRow>
                    <InputRow label='Telefonnummer' className={style.inputRow} labelClass={style.label}>
                        <MyInput className={style.input} value={phoneNumber} onChange={setPhoneNumber} placeholder='Telefonnummer eingeben'/>
                    </InputRow>
                </div>
              <PhotoSelection setIsOpen={()=>{}} shadow='admin' onSelect={(value: SelectedImage) => props.onPhotoChange(value)} />
            </Row>
            <NewRackets />
        </div>
    )
}

export default Main
