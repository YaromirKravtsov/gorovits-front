import React, { FC, useEffect, useState } from 'react'
import style from './RacketCard.module.css';
import { IRacket } from '../../models/IRacket';
import GradientBlackBlock from '../../../../UI/GradientBlackBlock/GradientBlackBlock';
import MyImage from '../../../../UI/MyImage/MyImage';
import HoverEffect from '../../../../UI/HoverEffect/HoverEffect';
import MyButton from '../../../../UI/MyButton/MyButton';
import DimOverlay from '../../../../UI/DimOverlay/DimOverlay';
import editIcon from '../../../../assets/images/settings/edit-icon-black.png';
import deleteIcon from '../../../../assets/images/settings/delete-icon-black.png'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu';
import { AdminSettingPageService } from '../../api/AdminSettingPageService';
import RacketFlutterMenu from '../RacketFlutterMenu/RacketFlutterMenu';
import RecordHeler from '../../../../helpers/recordHelper';


interface Props {
  racket: IRacket,
  handelDelete: (id: number) => void,
  handelEdit: (racket: IRacket) => void
}
const RacketCard: FC<Props> = ({ racket, handelDelete, handelEdit }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false)

  return (
    <>
      {isEditing &&
        <RacketFlutterMenu action='edit' setIsOpen={setIsEditing} racket={racket} handelEdit={handelEdit} />
      }

      <GradientBlackBlock className={style.racketBlock}>
        <MyImage alt='' src={racket.imgLink} className={style.racketImg} />
        <div className={style.racketName}><span>{racket.manufacturer.name}</span> <span>{racket?.name}</span></div>
     
        <div className={style.buttonRow}>
          <MyButton mode='white' className={`${style.actionsButton} ${style.editButton}`} onClick={() => { setIsEditing(true) }}>


            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className={style.actionsImg}>
              <path d="M5.48167 27.2914L5.92251 26.6846H5.92251L5.48167 27.2914ZM3.98835 25.798L3.38159 26.2389L3.98835 25.798ZM24.2168 27.2914L23.7759 26.6846H23.7759L24.2168 27.2914ZM25.7101 25.798L25.1033 25.3572H25.1033L25.7101 25.798ZM3.98835 7.06294L3.38159 6.6221H3.38159L3.98835 7.06294ZM5.48167 5.56962L5.92251 6.17639L5.48167 5.56962ZM12.1582 5.04016C12.5724 5.0352 12.9041 4.69541 12.8992 4.28123C12.8942 3.86704 12.5544 3.53531 12.1402 3.54027L12.1582 5.04016ZM27.7394 19.1395C27.7444 18.7253 27.4127 18.3855 26.9985 18.3805C26.5843 18.3756 26.2445 18.7073 26.2395 19.1215L27.7394 19.1395ZM15.9259 21.8365L15.8431 21.0911L15.9259 21.8365ZM10.3642 21.4349L9.83388 21.9652H9.83388L10.3642 21.4349ZM9.96262 15.8732L10.708 15.956L9.96262 15.8732ZM11.5112 12.6511L10.9809 12.1208L11.5112 12.6511ZM10.3172 14.0604L9.6412 13.7355L10.3172 14.0604ZM19.148 20.2879L19.6783 20.8182L19.148 20.2879ZM17.7387 21.4819L18.0636 22.1579L17.7387 21.4819ZM14.8492 27.8305C12.3014 27.8305 10.4509 27.8295 9.0133 27.6737C7.58979 27.5195 6.66052 27.2208 5.92251 26.6846L5.04083 27.8981C6.07716 28.6511 7.30059 28.9969 8.85174 29.165C10.3888 29.3315 12.3349 29.3305 14.8492 29.3305V27.8305ZM1.94922 16.4305C1.94922 18.9449 1.94819 20.8909 2.11472 22.428C2.28278 23.9791 2.62865 25.2025 3.38159 26.2389L4.59512 25.3572C4.05892 24.6192 3.76023 23.6899 3.606 22.2664C3.45025 20.8288 3.44922 18.9783 3.44922 16.4305H1.94922ZM5.92251 26.6846C5.41314 26.3145 4.96519 25.8666 4.59512 25.3572L3.38159 26.2389C3.84419 26.8756 4.40412 27.4355 5.04083 27.8981L5.92251 26.6846ZM14.8492 29.3305C17.3636 29.3305 19.3096 29.3315 20.8467 29.165C22.3978 28.9969 23.6213 28.6511 24.6576 27.8981L23.7759 26.6846C23.0379 27.2208 22.1086 27.5195 20.6851 27.6737C19.2476 27.8295 17.397 27.8305 14.8492 27.8305V29.3305ZM25.1033 25.3572C24.7332 25.8666 24.2853 26.3145 23.7759 26.6846L24.6576 27.8981C25.2943 27.4355 25.8542 26.8756 26.3168 26.2389L25.1033 25.3572ZM3.44922 16.4305C3.44922 13.8827 3.45025 12.0321 3.606 10.5946C3.76023 9.17106 4.05892 8.24179 4.59512 7.50378L3.38159 6.6221C2.62865 7.65843 2.28278 8.88187 2.11472 10.433C1.94819 11.9701 1.94922 13.9161 1.94922 16.4305H3.44922ZM5.04083 4.96286C4.40412 5.42546 3.84419 5.98539 3.38159 6.6221L4.59512 7.50378C4.96519 6.99441 5.41314 6.54646 5.92251 6.17639L5.04083 4.96286ZM12.1402 3.54027C8.85143 3.57969 6.68932 3.76516 5.04083 4.96286L5.92251 6.17639C7.12665 5.30153 8.79512 5.08048 12.1582 5.04016L12.1402 3.54027ZM26.2395 19.1215C26.1992 22.4846 25.9782 24.1531 25.1033 25.3572L26.3168 26.2389C27.5145 24.5904 27.7 22.4283 27.7394 19.1395L26.2395 19.1215ZM25.8696 12.5056L18.6176 19.7576L19.6783 20.8182L26.9302 13.5663L25.8696 12.5056ZM12.0415 13.1815L19.2935 5.92955L18.2328 4.86889L10.9809 12.1208L12.0415 13.1815ZM15.8431 21.0911C14.2718 21.2657 13.1744 21.3857 12.3523 21.3592C11.5504 21.3333 11.1598 21.1698 10.8945 20.9046L9.83388 21.9652C10.4862 22.6176 11.3285 22.8269 12.3039 22.8584C13.2593 22.8893 14.484 22.7513 16.0087 22.5819L15.8431 21.0911ZM9.21721 15.7904C9.04779 17.3151 8.90985 18.5398 8.9407 19.4952C8.9722 20.4706 9.18154 21.3129 9.83388 21.9652L10.8945 20.9046C10.6293 20.6393 10.4658 20.2488 10.4399 19.4468C10.4134 18.6247 10.5334 17.5273 10.708 15.956L9.21721 15.7904ZM10.9809 12.1208C10.3538 12.7479 9.9085 13.1794 9.6412 13.7355L10.9932 14.3853C11.1242 14.1126 11.3422 13.8809 12.0415 13.1815L10.9809 12.1208ZM10.708 15.956C10.8173 14.973 10.8621 14.6581 10.9932 14.3853L9.6412 13.7355C9.3739 14.2917 9.31514 14.909 9.21721 15.7904L10.708 15.956ZM18.6176 19.7576C17.9182 20.457 17.6865 20.6749 17.4138 20.806L18.0636 22.1579C18.6197 21.8906 19.0512 21.4453 19.6783 20.8182L18.6176 19.7576ZM16.0087 22.5819C16.8901 22.484 17.5074 22.4252 18.0636 22.1579L17.4138 20.806C17.1411 20.937 16.8261 20.9819 15.8431 21.0911L16.0087 22.5819ZM25.8696 5.92955C26.7846 6.84454 27.4163 7.47856 27.8286 8.01895C28.2277 8.54203 28.3499 8.88832 28.3499 9.21759H29.8499C29.8499 8.42849 29.5221 7.76559 29.0212 7.10908C28.5335 6.46988 27.8152 5.7539 26.9302 4.86889L25.8696 5.92955ZM26.9302 13.5663C27.8152 12.6813 28.5335 11.9653 29.0212 11.3261C29.5221 10.6696 29.8499 10.0067 29.8499 9.21759H28.3499C28.3499 9.54686 28.2277 9.89316 27.8286 10.4162C27.4163 10.9566 26.7846 11.5906 25.8696 12.5056L26.9302 13.5663ZM26.9302 4.86889C26.0452 3.98388 25.3292 3.26565 24.69 2.77795C24.0335 2.27705 23.3706 1.94922 22.5815 1.94922V3.44922C22.9108 3.44922 23.2571 3.57139 23.7802 3.97048C24.3206 4.38279 24.9546 5.01456 25.8696 5.92955L26.9302 4.86889ZM19.2935 5.92955C20.2085 5.01456 20.8425 4.38279 21.3829 3.97048C21.906 3.57139 22.2523 3.44922 22.5815 3.44922V1.94922C21.7924 1.94922 21.1295 2.27705 20.473 2.77795C19.8338 3.26565 19.1178 3.98388 18.2328 4.86889L19.2935 5.92955ZM26.9302 12.5056L19.2935 4.86889L18.2328 5.92955L25.8696 13.5663L26.9302 12.5056Z" fill="white" />
            </svg>

          </MyButton>
          <MyButton mode='white' className={`${style.actionsButton} ${style.deleteButton}`} onClick={() => handelDelete(racket.id)}>
            <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" className={style.actionsImg}>
              <path d="M24.9986 17.2515L25.7415 17.3549L24.9986 17.2515ZM24.6445 19.7963L25.3873 19.8997L24.6445 19.7963ZM7.75632 19.7963L8.49917 19.6929L7.75632 19.7963ZM7.40217 17.2515L6.65933 17.3549L7.40217 17.2515ZM12.3983 29.3439L12.1067 30.0349L12.3983 29.3439ZM8.74175 25.0557L9.44574 24.797L8.74175 25.0557ZM23.659 25.0557L24.363 25.3143L23.659 25.0557ZM20.0025 29.3439L19.7109 28.6529L20.0025 29.3439ZM7.49703 12.0783C7.45785 11.6659 7.09181 11.3634 6.67945 11.4026C6.26709 11.4418 5.96457 11.8078 6.00375 12.2202L7.49703 12.0783ZM26.397 12.2202C26.4362 11.8078 26.1337 11.4418 25.7213 11.4026C25.309 11.3634 24.9429 11.6659 24.9038 12.0783L26.397 12.2202ZM27.0004 10.1992C27.4146 10.1992 27.7504 9.86343 27.7504 9.44922C27.7504 9.03501 27.4146 8.69922 27.0004 8.69922V10.1992ZM5.40039 8.69922C4.98618 8.69922 4.65039 9.03501 4.65039 9.44922C4.65039 9.86343 4.98618 10.1992 5.40039 10.1992V8.69922ZM12.7504 24.2992C12.7504 24.7134 13.0862 25.0492 13.5004 25.0492C13.9146 25.0492 14.2504 24.7134 14.2504 24.2992H12.7504ZM14.2504 13.4992C14.2504 13.085 13.9146 12.7492 13.5004 12.7492C13.0862 12.7492 12.7504 13.085 12.7504 13.4992H14.2504ZM18.1504 24.2992C18.1504 24.7134 18.4862 25.0492 18.9004 25.0492C19.3146 25.0492 19.6504 24.7134 19.6504 24.2992H18.1504ZM19.6504 13.4992C19.6504 13.085 19.3146 12.7492 18.9004 12.7492C18.4862 12.7492 18.1504 13.085 18.1504 13.4992H19.6504ZM21.6004 9.44922V10.1992H22.3504V9.44922H21.6004ZM10.8004 9.44922H10.0504V10.1992H10.8004V9.44922ZM24.2558 17.1482L23.9016 19.6929L25.3873 19.8997L25.7415 17.3549L24.2558 17.1482ZM8.49917 19.6929L8.14501 17.1482L6.65933 17.3549L7.01348 19.8997L8.49917 19.6929ZM16.2004 28.9492C14.1596 28.9492 13.3584 28.935 12.6899 28.6529L12.1067 30.0349C13.1221 30.4634 14.2943 30.4492 16.2004 30.4492V28.9492ZM7.01348 19.8997C7.39298 22.6266 7.59494 24.109 8.03776 25.3143L9.44574 24.797C9.07243 23.781 8.88949 22.4976 8.49917 19.6929L7.01348 19.8997ZM12.6899 28.6529C11.3593 28.0914 10.1595 26.7396 9.44574 24.797L8.03776 25.3143C8.85021 27.5256 10.2885 29.2677 12.1067 30.0349L12.6899 28.6529ZM23.9016 19.6929C23.5113 22.4976 23.3284 23.781 22.955 24.797L24.363 25.3143C24.8058 24.109 25.0078 22.6266 25.3873 19.8997L23.9016 19.6929ZM16.2004 30.4492C18.1064 30.4492 19.2787 30.4634 20.2941 30.0349L19.7109 28.6529C19.0424 28.935 18.2412 28.9492 16.2004 28.9492V30.4492ZM22.955 24.797C22.2413 26.7396 21.0415 28.0914 19.7109 28.6529L20.2941 30.0349C22.1122 29.2677 23.5506 27.5256 24.363 25.3143L22.955 24.797ZM8.14501 17.1482C7.84546 14.9957 7.62057 13.3785 7.49703 12.0783L6.00375 12.2202C6.1311 13.5605 6.36155 15.2152 6.65933 17.3549L8.14501 17.1482ZM25.7415 17.3549C26.0392 15.2152 26.2697 13.5605 26.397 12.2202L24.9038 12.0783C24.7802 13.3785 24.5553 14.9957 24.2558 17.1482L25.7415 17.3549ZM27.0004 8.69922H5.40039V10.1992H27.0004V8.69922ZM14.2504 24.2992V13.4992H12.7504V24.2992H14.2504ZM19.6504 24.2992V13.4992H18.1504V24.2992H19.6504ZM20.8504 8.09922V9.44922H22.3504V8.09922H20.8504ZM21.6004 8.69922H10.8004V10.1992H21.6004V8.69922ZM11.5504 9.44922V8.09922H10.0504V9.44922H11.5504ZM16.2004 3.44922C18.7685 3.44922 20.8504 5.5311 20.8504 8.09922H22.3504C22.3504 4.70267 19.5969 1.94922 16.2004 1.94922V3.44922ZM16.2004 1.94922C12.8038 1.94922 10.0504 4.70267 10.0504 8.09922H11.5504C11.5504 5.5311 13.6323 3.44922 16.2004 3.44922V1.94922Z" fill="#FAFAFA" />
            </svg>

          </MyButton>
        </div>


      </GradientBlackBlock>

    </>
  )
}

export default RacketCard
