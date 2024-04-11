import React, { FC, useState } from 'react'
import { IString } from '../../models/IString'
import RacketFlutterMenu from '../RacketFlutterMenu/RacketFlutterMenu';
import HoverEffect from '../../../../UI/HoverEffect/HoverEffect';
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import style from './StringCard.module.css'
import MyImage from '../../../../UI/MyImage/MyImage';
import RecordHeler from '../../../../helpers/recordHelper';
import DimOverlay from '../../../../UI/DimOverlay/DimOverlay';
import MyButton from '../../../../UI/MyButton/MyButton';
import StringFlutterMenu from '../StringFlutterMenu/StringFlutterMenu';
interface Props {
    string: IString;
    handelDelete: (id: number) => void,
    handelEdit:  (string: IString) => void,
}
const StringCard: FC<Props> = ({ string,handelDelete ,handelEdit}) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false)

    return (
        <>
            {isEditing &&
                <>
             
                    {<StringFlutterMenu action='edit' setIsOpen={setIsEditing} string ={string} handelEdit ={handelEdit}/>}
                    
                </>
            }
            <HoverEffect setIsHovered={setIsHover}>
                <GradientBlackBlock className={style.stringBlock}>
                    <MyImage alt='' src={string.imgLink} className={style.stringImg} />
                    <div className={style.stringName}>{RecordHeler.splitString(string.name,30)}</div>
                    {isHover &&
                        <DimOverlay className={style.dimBlock} >
                            <MyButton mode='white' className={style.actionsButton} onClick={() => { setIsEditing(true) }}>
                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" className={style.actionsImg} >
                                    <path d="M11.1589 4.04114C11.5731 4.03617 11.9049 3.69639 11.8999 3.2822C11.8949 2.86802 11.5551 2.53628 11.141 2.54125L11.1589 4.04114ZM26.7402 18.1405C26.7451 17.7263 26.4134 17.3865 25.9992 17.3815C25.585 17.3766 25.2452 17.7083 25.2403 18.1225L26.7402 18.1405ZM13.85 26.8315C11.3022 26.8315 9.4516 26.8304 8.01404 26.6747C6.59052 26.5205 5.66125 26.2218 4.92324 25.6856L4.04156 26.8991C5.07789 27.652 6.30133 27.9979 7.85247 28.166C9.3896 28.3325 11.3356 28.3315 13.85 28.3315V26.8315ZM0.949951 15.4315C0.949951 17.9458 0.948921 19.8918 1.11546 21.4289C1.28351 22.9801 1.62938 24.2035 2.38232 25.2399L3.59585 24.3582C3.05965 23.6202 2.76096 22.6909 2.60673 21.2674C2.45098 19.8298 2.44995 17.9792 2.44995 15.4315H0.949951ZM4.92324 25.6856C4.41387 25.3155 3.96593 24.8675 3.59585 24.3582L2.38232 25.2399C2.84492 25.8766 3.40485 26.4365 4.04156 26.8991L4.92324 25.6856ZM13.85 28.3315C16.3643 28.3315 18.3103 28.3325 19.8474 28.166C21.3986 27.9979 22.622 27.652 23.6583 26.8991L22.7767 25.6856C22.0386 26.2218 21.1094 26.5205 19.6859 26.6747C18.2483 26.8304 16.3977 26.8315 13.85 26.8315V28.3315ZM24.1041 24.3582C23.734 24.8675 23.286 25.3155 22.7767 25.6856L23.6583 26.8991C24.295 26.4365 24.855 25.8766 25.3176 25.2399L24.1041 24.3582ZM2.44995 15.4315C2.44995 12.8837 2.45098 11.0331 2.60673 9.5956C2.76096 8.17204 3.05965 7.24275 3.59585 6.50475L2.38232 5.62308C1.62938 6.6594 1.28351 7.88284 1.11546 9.434C0.948921 10.9711 0.949951 12.9171 0.949951 15.4315H2.44995ZM4.04156 3.96384C3.40485 4.42643 2.84492 4.98637 2.38232 5.62308L3.59585 6.50475C3.96593 5.99538 4.41387 5.54744 4.92324 5.17736L4.04156 3.96384ZM11.141 2.54125C7.85216 2.58067 5.69005 2.76614 4.04156 3.96384L4.92324 5.17736C6.12738 4.30251 7.79586 4.08145 11.1589 4.04114L11.141 2.54125ZM25.2403 18.1225C25.2 21.4856 24.9789 23.154 24.1041 24.3582L25.3176 25.2399C26.5153 23.5914 26.7007 21.4293 26.7402 18.1405L25.2403 18.1225ZM24.8703 11.5066L17.6184 18.7585L18.679 19.8192L25.931 12.5673L24.8703 11.5066ZM11.0423 12.1825L18.2942 4.93052L17.2335 3.86986L9.9816 11.1218L11.0423 12.1825ZM14.8438 20.0921C13.2725 20.2667 12.1752 20.3867 11.3531 20.3602C10.5511 20.3343 10.1605 20.1708 9.8953 19.9056L8.83461 20.9662C9.487 21.6186 10.3292 21.8279 11.3047 21.8594C12.26 21.8902 13.4847 21.7523 15.0095 21.5829L14.8438 20.0921ZM8.21794 14.7913C8.04852 16.3161 7.91058 17.5408 7.94143 18.4962C7.97293 19.4716 8.18227 20.3139 8.83461 20.9662L9.8953 19.9056C9.63 19.6403 9.4666 19.2497 9.4407 18.4477C9.4141 17.6256 9.5342 16.5283 9.7088 14.957L8.21794 14.7913ZM9.9816 11.1218C9.3545 11.7489 8.90923 12.1804 8.64193 12.7365L9.9939 13.3863C10.125 13.1136 10.3429 12.8818 11.0423 12.1825L9.9816 11.1218ZM9.7088 14.957C9.818 13.974 9.8628 13.659 9.9939 13.3863L8.64193 12.7365C8.37463 13.2927 8.31587 13.91 8.21794 14.7913L9.7088 14.957ZM17.6184 18.7585C16.919 19.4579 16.6872 19.6759 16.4145 19.8069L17.0643 21.1589C17.6205 20.8916 18.052 20.4463 18.679 19.8192L17.6184 18.7585ZM15.0095 21.5829C15.8909 21.485 16.5082 21.4262 17.0643 21.1589L16.4145 19.8069C16.1418 19.938 15.8269 19.9828 14.8438 20.0921L15.0095 21.5829ZM24.8703 4.93052C25.7853 5.84552 26.4171 6.47954 26.8294 7.01993C27.2285 7.54301 27.3506 7.88929 27.3506 8.21856H28.8506C28.8506 7.42946 28.5228 6.76657 28.0219 6.11006C27.5342 5.47085 26.816 4.75487 25.931 3.86986L24.8703 4.93052ZM25.931 12.5673C26.816 11.6823 27.5342 10.9663 28.0219 10.3271C28.5228 9.6706 28.8506 9.00769 28.8506 8.21856H27.3506C27.3506 8.54783 27.2285 8.89413 26.8294 9.4172C26.4171 9.9576 25.7853 10.5916 24.8703 11.5066L25.931 12.5673ZM25.931 3.86986C25.046 2.98486 24.33 2.26662 23.6908 1.77893C23.0343 1.27803 22.3714 0.950195 21.5823 0.950195V2.4502C21.9115 2.4502 22.2578 2.57236 22.7809 2.97146C23.3213 3.38377 23.9553 4.01553 24.8703 4.93052L25.931 3.86986ZM18.2942 4.93052C19.2092 4.01553 19.8432 3.38376 20.3836 2.97146C20.9067 2.57236 21.253 2.4502 21.5823 2.4502V0.950195C20.7931 0.950195 20.1302 1.27803 19.4737 1.77893C18.8345 2.26662 18.1186 2.98486 17.2335 3.86986L18.2942 4.93052ZM25.931 11.5066L18.2942 3.86986L17.2335 4.93052L24.8703 12.5673L25.931 11.5066Z" fill="black" />
                                </svg>


                            </MyButton>
                            <MyButton mode='white' className={style.actionsButton} onClick={() => handelDelete(string.id)}>
                                <svg className={style.actionsImg} width={37} height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.49666 11.0793C3.45748 10.6669 3.09144 10.3644 2.67908 10.4036C2.26673 10.4427 1.96421 10.8088 2.00339 11.2211L3.49666 11.0793ZM22.3967 11.2211C22.4358 10.8088 22.1333 10.4427 21.721 10.4036C21.3086 10.3644 20.9426 10.6669 20.9034 11.0793L22.3967 11.2211ZM23 9.2002C23.4142 9.2002 23.75 8.86441 23.75 8.4502C23.75 8.03598 23.4142 7.7002 23 7.7002V9.2002ZM1.40002 7.7002C0.985814 7.7002 0.650024 8.03598 0.650024 8.4502C0.650024 8.86441 0.985814 9.2002 1.40002 9.2002V7.7002ZM8.75 23.3002C8.75 23.7144 9.0858 24.0502 9.5 24.0502C9.9142 24.0502 10.25 23.7144 10.25 23.3002H8.75ZM10.25 12.5002C10.25 12.086 9.9142 11.7502 9.5 11.7502C9.0858 11.7502 8.75 12.086 8.75 12.5002H10.25ZM14.15 23.3002C14.15 23.7144 14.4858 24.0502 14.9 24.0502C15.3142 24.0502 15.65 23.7144 15.65 23.3002H14.15ZM15.65 12.5002C15.65 12.086 15.3142 11.7502 14.9 11.7502C14.4858 11.7502 14.15 12.086 14.15 12.5002H15.65ZM17.6 8.4502V9.2002H18.35V8.4502H17.6ZM6.8 8.4502H6.05V9.2002H6.8V8.4502ZM20.2554 16.1491L19.9013 18.6939L21.3869 18.9007L21.7411 16.3559L20.2554 16.1491ZM4.4988 18.6939L4.14465 16.1491L2.65897 16.3559L3.01312 18.9007L4.4988 18.6939ZM12.2 27.9502C10.1592 27.9502 9.358 27.936 8.6895 27.6539L8.1064 29.0359C9.1217 29.4644 10.294 29.4502 12.2 29.4502V27.9502ZM3.01312 18.9007C3.39261 21.6276 3.59457 23.11 4.0374 24.3153L5.44537 23.798C5.07207 22.7819 4.88912 21.4986 4.4988 18.6939L3.01312 18.9007ZM8.6895 27.6539C7.3589 27.0924 6.1591 25.7406 5.44537 23.798L4.0374 24.3153C4.84985 26.5266 6.2882 28.2687 8.1064 29.0359L8.6895 27.6539ZM19.9013 18.6939C19.5109 21.4986 19.328 22.7819 18.9547 23.798L20.3627 24.3153C20.8055 23.11 21.0074 21.6276 21.3869 18.9007L19.9013 18.6939ZM12.2 29.4502C14.1061 29.4502 15.2783 29.4644 16.2937 29.0359L15.7105 27.6539C15.042 27.936 14.2408 27.9502 12.2 27.9502V29.4502ZM18.9547 23.798C18.2409 25.7406 17.0411 27.0924 15.7105 27.6539L16.2937 29.0359C18.1119 28.2687 19.5502 26.5266 20.3627 24.3153L18.9547 23.798ZM4.14465 16.1491C3.84509 13.9967 3.6202 12.3795 3.49666 11.0793L2.00339 11.2211C2.13074 12.5615 2.36118 14.2162 2.65897 16.3559L4.14465 16.1491ZM21.7411 16.3559C22.0389 14.2162 22.2693 12.5615 22.3967 11.2211L20.9034 11.0793C20.7798 12.3795 20.555 13.9966 20.2554 16.1491L21.7411 16.3559ZM23 7.7002H1.40002V9.2002H23V7.7002ZM10.25 23.3002V12.5002H8.75V23.3002H10.25ZM15.65 23.3002V12.5002H14.15V23.3002H15.65ZM16.85 7.10019V8.4502H18.35V7.10019H16.85ZM17.6 7.7002H6.8V9.2002H17.6V7.7002ZM7.55 8.4502V7.10019H6.05V8.4502H7.55ZM12.2 2.4502C14.7681 2.4502 16.85 4.53206 16.85 7.10019H18.35C18.35 3.70363 15.5966 0.950195 12.2 0.950195V2.4502ZM12.2 0.950195C8.8035 0.950195 6.05 3.70363 6.05 7.10019H7.55C7.55 4.53206 9.6319 2.4502 12.2 2.4502V0.950195Z" fill="#232323" />
                                </svg>
                            </MyButton>
                        </DimOverlay>
                    }
                </GradientBlackBlock>
            </HoverEffect>
        </>
    )
}

export default StringCard
