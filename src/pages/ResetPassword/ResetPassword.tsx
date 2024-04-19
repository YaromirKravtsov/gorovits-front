import React, { useEffect, useState } from 'react'
import style from './ResetPassword.module.css'
import FlutterMenu from '../../UI/FlutterMenu/FlutterMenu';
import MyImage from '../../UI/MyImage/MyImage';
import logo from '../../assets/images/login_logo.png'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import InputRow from '../../components/InputRow/InputRow';
import MyInput from '../../components/MyInput/MyInput';
import MyButton from '../../UI/MyButton/MyButton';
import { useNavigate, useParams } from 'react-router-dom';
import { getErrorText } from '../../helpers/FormDataGeneration';
import InfoFlutter from '../../UI/InfoFlutter/InfoFlutter';
import { ResetPasswordService } from './api/ResetPasswordService';
const ResetPassword = () => {
  const { resetToken } = useParams()
  const { error } = useTypedSelector(state => state.auth);

  const [newPass, setNewPass] = useState<string>('')
  const [repNewPass, setRepNewPass] = useState<string>('')
  const { windowWidth } = useTypedSelector(state => state.adaptive);
  const [errorL,setErrorL] = useState<string>('');
  const navigate = useNavigate()
  const handelLogin = async () => {
      if(newPass !== repNewPass){
        setErrorL('Die Passwörter stimmen nicht überein.')
        return;
      }

      try{
        await ResetPasswordService.changePassword(String(resetToken),newPass);
        navigate('/login')
      }catch(error){
        setErrorL(getErrorText(error))
      }
  }
  useEffect(() => {
  
    const fetch = async () => {
      const {data} = await ResetPasswordService.resetLinkCheck(String(resetToken));
      console.log('sdsdsd')
      console.log(data)
      if(!data){
        navigate('/login')
      }
 
    }
    fetch()
  }, [])

  useEffect(()=>{
    setErrorL('')
  },[newPass, repNewPass])
  return (
    <div className={style.main}>
      <FlutterMenu className={style.flutter} shadow={windowWidth >= 600 ? 'small' : 'all'}>

        <MyImage alt='sds' src={logo} className={style.image} />
        <div>
          <InputRow label='Neues Passwort' className={style.inputRow}>
            <MyInput
              placeholder='Neues Passwort eingeben' name='email'
              type='password'
              className={style.input}
              value={newPass}
              onChange={setNewPass}
              
            />
          </InputRow>
          <InputRow label='Bestätigen das neue Passwort' className={style.inputRow} >
            <MyInput
              placeholder='Neues Passwort eingeben' name='email'
              type='password'
              className={style.input}
              value={repNewPass}
              onChange={setRepNewPass}
            />
          </InputRow>
          {
            error &&
            <div className={style.errorText}>{error}</div>
          }
          {
          errorL &&
          <div className={style.errorText}>{errorL}</div>
            
          }
          <MyButton mode='black' className={style.button} onClick={handelLogin}>Passwort ändern</MyButton>
        </div>
      </FlutterMenu >
     
    </div>
  )
}
export default ResetPassword
