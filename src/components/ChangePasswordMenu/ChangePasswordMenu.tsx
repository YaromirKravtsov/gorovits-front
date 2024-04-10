import React, { FC, useEffect, useState } from 'react'
import style from './ChangePasswordMenu.module.css';
import FlutterMenu from '../../UI/FlutterMenu/FlutterMenu';
import MyButton from '../../UI/MyButton/MyButton';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import MyInput from '../MyInput/MyInput';

export interface ChangePasswordDto {
  currentPassword: string,
  newPassword: string,
  userId: number
}
interface PasswordsData {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
}

interface Props {
  isOpenChange: (value: boolean) => void,
  userId: number;
}
const ChangePasswordMenu: FC<Props> = (props) => {

  const [passwordsData, setPasswordsData] = useState<PasswordsData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const { editUserInfoError } = useTypedSelector(state => state.user)
  const [inputsError, setInputsError] = useState<string>();
  const { changePasword, setEditUserInfoError } = useActions();

  useEffect(() => {
    setInputsError(editUserInfoError);
  }, [editUserInfoError])

  const validateInputs = (): boolean => {
    if (passwordsData.newPassword !== passwordsData.confirmPassword || passwordsData.newPassword == '') {
      setInputsError('Die Passwörter stimmen nicht überein.');
      return false;
    }
    return true;
  }

  const handelSubmit = async () => {
    if (validateInputs()) {
      const changePasswordDto: ChangePasswordDto = {
        currentPassword: passwordsData.currentPassword,
        newPassword: passwordsData.newPassword,
        userId: props.userId
      }
      await changePasword(changePasswordDto)
      if (editUserInfoError == '') {
        props.isOpenChange(false)
      }
    }
  }
  console.log(inputsError)
  return (
    <div>
      <FlutterMenu className={style.flutterMenu} shadow='all'>
        <div className={style.flutterTitle}>
          Passwort ändern
        </div>
        <div className={style.inputRow}>
          <div className={style.inputLabel}>Aktuelles Passwort</div>

          <MyInput type="password" name='password' className={style.input} placeholder='Aktuelles Passwort eingeben'
            value={passwordsData.currentPassword}
            onChange={value => setPasswordsData(prev => ({ ...prev, currentPassword: value }))} />
        </div>

        <div className={style.inputRow}>
          <div className={style.inputLabel}>Neues Passwort</div>

          <MyInput type="password" name='password'
            className={style.input} placeholder='Neues Passwort eingeben'
            value={passwordsData.newPassword}
            onChange={e => setPasswordsData(prev => ({ ...prev, newPassword: e }))} />
        </div>
        <div className={style.inputRow}>
          <div className={style.inputLabel}>Bestätigen das neue Passwort </div>
          <MyInput type="password" name='password'
            className={style.input} placeholder='Neues Passwort eingeben'
            value={passwordsData.confirmPassword}
            onChange={e => setPasswordsData(prev => ({ ...prev, confirmPassword: e }))} />
          <div className={style.inputError}>{inputsError}</div>
        </div>
        <MyButton className={`${style.passwordButton} ${style.firstButton}`} mode='black' onClick={handelSubmit}>
          Passwort ändern
        </MyButton>

        <MyButton className={style.passwordButton} mode='white' border onClick={() => props.isOpenChange(false)}>
          Schließen
        </MyButton>
      </FlutterMenu>
    </div>
  )
}

export default ChangePasswordMenu
