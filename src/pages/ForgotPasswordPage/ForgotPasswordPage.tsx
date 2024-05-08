import React, { useState } from 'react'
import style from './ForgotPasswordPage.module.css'
import FlutterMenu from '../../UI/FlutterMenu/FlutterMenu';
import MyImage from '../../UI/MyImage/MyImage';
import logo from '../../assets/images/login_logo.png'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import InputRow from '../../components/InputRow/InputRow';
import MyInput from '../../components/MyInput/MyInput';
import MyButton from '../../UI/MyButton/MyButton';
import { Link, useNavigate } from 'react-router-dom';
import { ForgotPasswrd } from './api/ForgotPasswordService';
import { getErrorText } from '../../helpers/FormDataGeneration';
import InfoFlutter from '../../UI/InfoFlutter/InfoFlutter';
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>('')
  const { windowWidth } = useTypedSelector(state => state.adaptive);
  const {setGlobalError} = useActions();
  const [isWeiterOpen,setIsWeiterOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const handelLogin = async () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      try{
        await ForgotPasswrd.ResetPassword(email);
        setIsWeiterOpen(true)
      }catch(error){
        setGlobalError(getErrorText(error))
      }
     
      
    }
  }
  return (
    <div className={style.main}>
      <FlutterMenu className={style.flutter} shadow={windowWidth >= 600 ? 'small' : 'all'}>

        <MyImage alt='sds' src={logo} className={style.image} />
        <div className={style.mainRow}>
          <InputRow label='Email' >
            <MyInput
              placeholder='Email eingeben' name='email'
              type='email'
              className={style.input}
              value={email}
              onChange={setEmail}
            />
          </InputRow>
          <MyButton mode='black' className={style.button} onClick={handelLogin}>Senden</MyButton>
          <MyButton mode='white' border className={style.button} link ={'/login'}>Zurück</MyButton>
        </div>
      </FlutterMenu >
      {isWeiterOpen&&
        <InfoFlutter 
        title ='Passwort zurücksetzen' 
        text='Wir haben dir eine E-Mail mit einem Link zum Aktualisieren deines Passworts geschickt.' onisOpen={setIsWeiterOpen} 
        actionString='Weiter'
        onCLick={()=> navigate('/login')}/>
      }
    </div>
  )
}


export default ForgotPasswordPage
