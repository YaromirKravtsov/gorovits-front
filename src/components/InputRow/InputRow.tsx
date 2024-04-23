import React, { FC, ReactNode, useEffect, useState } from 'react';
import style from './InputRow.module.css';
import questionMark from '../../assets/images/question-icon.png';
import Column from '../Layout/Column/Column';
import QuestionMark from '../../UI/QuestionMark/QuestionMark';


interface Props {
  label: string;
  children: ReactNode;
  questionMark?: boolean;
  questionText?: string;
  questionTextClass?: string,
  className?:string
  labelClass?:string
}

const InputRow: FC<Props> = ({questionMark = false,...props}) => {
  const [isQuestionOpen, setIsQuestionOpen] = useState<boolean>(false);

  return (
    <Column className={`${style.inputsRow} ${props.className}`}>
      <div className={`${style.label} ${props.labelClass}`}>
        {props.label} {questionMark&&<QuestionMark text={String(props.questionText)} size='small' />}
      </div>
      {props.children}
    </Column>
  );
};

export default InputRow;
