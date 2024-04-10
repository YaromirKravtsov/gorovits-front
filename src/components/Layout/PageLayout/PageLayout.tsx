import React, { FC, ReactNode } from 'react'
import style from './PageLayout.module.css';
import QuestionMark from '../../../UI/QuestionMark/QuestionMark';
interface PageLayoutProps {
  topMenu?: ReactNode;
  title: string;
  children: ReactNode;
  questionMarkText: string;
  flex?: boolean
}
const PageLayout: FC<PageLayoutProps> = (props) => {

  return (
    <div className={style.component}>
      <div className={`${style.topMenu} ${props.flex ? style.flex: ''}`}>
        <div className={style.title}>{props.title}</div>
        <div className={`${style.topMenuElemet}`}>
        <div style ={{marginLeft: "auto"}}></div>
            {props.topMenu}
        {/*   <div style ={{marginLeft: "auto"}}></div> */}
            <QuestionMark text={props.questionMarkText} />
         
        </div>
      </div>
      <div className={style.main}>
        {props.children}
      </div>
    </div>
  )
}

export default PageLayout
