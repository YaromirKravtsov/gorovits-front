import React, { FC } from 'react'
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock'
import style from './KundenCard.module.css'
import BorderMenu from '../../../../UI/BorderMenu/BorderMenu';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../../../models/IUser';

interface Props{
    user:IUser
}
const KundenCard:FC<Props> = ({user}) => {

    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/user-account/${(user).id}`)}>
            <GradientBlackBlock className={style.gradientBlock}  >
                <BorderMenu className={style.block}>
                    {user.fullName}
                </BorderMenu>

                <BorderMenu className={style.block}>
                    {user.phoneNumber || 'Keine Telefonnummer '}
                </BorderMenu>

                <BorderMenu className={style.block}>
                    {user.email}
                </BorderMenu>
            </GradientBlackBlock>
        </div>
    )
}

export default KundenCard
