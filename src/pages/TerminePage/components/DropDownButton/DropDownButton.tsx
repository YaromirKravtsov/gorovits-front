import { FC, useEffect, useState } from 'react';
import style from './DropDownButton.module.css'
import MyButton from '../../../../UI/MyButton/MyButton';
import MyImage from '../../../../UI/MyImage/MyImage';
import arrow from '../../../../assets/images/arrow.png';
import QuestionMark from '../../../../UI/QuestionMark/QuestionMark';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
interface Props {
  options: {
    text: string;
    value: number;
    questionText?: string
  }[],
  onSelect: (option: number) => void,
  title: string,
  className?: string,
  dropClass?: string
}
const DropDownButton: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { windowWidth } = useTypedSelector(state => state.adaptive)
  const handleClick = () => {
    if (isOpen) setIsOpen(false);
    else setIsOpen(true);


  }
  const handleSelect = (option: number) => {
    setIsOpen(false)
    props.onSelect(option);
  }

  const [isHover, setIsHover] = useState<{ value: number, bool: boolean }[]>([{ value: 0, bool: false }])
  useEffect(() => {

    const data = props.options.map(op => {
      return {
        value: op.value, bool: false
      }
    })
    setIsHover(data)
  }, [props.options])



  return (
    <div className={style.main}>
      <MyButton onClick={() => handleClick()} className={`${style.button} ${props.className}`} mode='black'>{props.title}
        <MyImage alt='arrow' src={arrow} className={`${style.arrow} ${isOpen && style.grad}`} />
      </MyButton>
      {isOpen &&
        <div className={`${style.dropDownList} ${props.dropClass}`}>
          {props.options.map((option, index) =>
            <div className={style.dropDownItem}>
              <button className={style.dropDownItemButton} key={index} onClick={() => handleSelect(option.value)}>{option.text}</button>
              {option.questionText &&
                <>
                  <QuestionMark text={option.questionText} droPosition={windowWidth >= 580 ? 'bottom-right' : 'center'} size='small' />
                </>
              }
            </div>
          )}
        </div>
      }

    </div>
  );
};

export default DropDownButton;