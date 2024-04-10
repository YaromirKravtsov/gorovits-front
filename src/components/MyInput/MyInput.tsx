import React, { ChangeEventHandler, FC, useState } from 'react';
import InputMask from 'react-input-mask';
import style from './MyInput.module.css';
import hiddenPass  from '../../assets/images/hidden-passowrd-icon.png'
import noHiddenPass  from '../../assets/images/on-hidden-password.png'
interface Props {
  value: string; // Добавляем проп value
  onChange: (value: string) => void;
  mask?: string;
  placeholder: string;
  error?: boolean;
  setError?: (value: boolean) => void,
  className?: string,
  type?: string,
  name?: string
}

const MyInput: FC<Props> = (props) => {

  const handleChange = (value: string) => {


    if (props.onChange) {
      props.onChange(value);
    }
    if (props.setError)
      props.setError(false);
  };

  const [isPasswordHidden,setIsPasswordHidden] = useState<boolean>(true)
  if (props.type == 'password') {
    return (
      <>
        <div className={style.passwordRow}>
          <input
            className={`${style.input} ${style.passwordInput} ${props.className} ${props.error ? style.error : ''}`}
            placeholder={props.placeholder}
            value={props.value}
            onChange={e => handleChange(e.target.value)}
            type={isPasswordHidden ? 'password' : 'text'}
       /*      id ='password-input' */
          />
          {props.value !== ''&&
          <button className={style.eyeIconButton}>
            <img src={  isPasswordHidden?hiddenPass: noHiddenPass} alt="" className={style.eyeIcon} onClick={() =>setIsPasswordHidden(prev => !prev) }/>
          </button>
          }
          
        </div>

        {props.error &&
          <div className={` ${style.errorInput}`}>Das Feld muss ausgefüllt werden </div>
        }
      </>
    );
  }
  return (
    <>
      <InputMask
        className={`${style.input} ${props.className} ${props.error ? style.error : ''}`}
        mask={props.mask ? props.mask : ''}
        maskPlaceholder="_"
        placeholder={props.placeholder}
        value={props.value}
        onChange={e => handleChange(e.target.value)}
        type={props.type ? props.type : "text"}
      />

      {props.error &&
        <div className={style.errorInput}>Das Feld muss ausgefüllt werden </div>
      }
    </>
  );
};

export default MyInput;
