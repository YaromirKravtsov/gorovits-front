import React, { FC, ReactNode, useEffect, useState } from 'react';
import style from './InputRow.module.css';
import questionMark from '../../assets/images/question-icon.png';
import Column from '../Layout/Column/Column';


interface Props {
  label: string;
  children: ReactNode;
  questionMark?: boolean;
  questionText?: string;
  questionTextClass?: string
}

const InputRow: FC<Props> = (props) => {
  const [isQuestionOpen, setIsQuestionOpen] = useState<boolean>(false);

  return (
    <Column className={style.inputsRow}>
      <div className={style.label}>
        {props.label} {props.questionMark && (
          <div>
            <img src={questionMark} alt='' className={style.questonIcon} 
             onMouseEnter={() => setIsQuestionOpen(true)}
             onMouseLeave={() => setIsQuestionOpen(false)}
            
            />
          
            {isQuestionOpen && (
              <div className={`${style.questionBlock} ${props.questionTextClass}`}   >
                {props.questionText}
              </div>
            )}
          </div>
        )}
      </div>
      {props.children}
    </Column>
  );
};

export default InputRow;
