import React, { useEffect, useState } from 'react'
import FlutterMenu from '../../../../UI/FlutterMenu/FlutterMenu'
import style from './LoginFrom.module.css'
import { useActions } from '../../../../hooks/useActions';
import logo from '../../../../assets/images/login_logo.png'
import MyImage from '../../../../UI/MyImage/MyImage';
import MyButton from '../../../../UI/MyButton/MyButton';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import MyInput from '../../../../components/MyInput/MyInput';
import InputRow from '../../../../components/InputRow/InputRow';
interface Errors {
  email: boolean,
  password: boolean
}
const LoginForm = () => {
  const { error } = useTypedSelector(state => state.auth);
  const { login, setGlobalError} = useActions()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {windowWidth} = useTypedSelector(state=> state.adaptive)
  const [errors, setErrors] = useState<Errors>({
    email: false,
    password: false
  })
  
  const validate = () => {
    const errorsL = {
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      password: password.trim() == ''
    };
    setErrors(errorsL);
    return Object.values(errorsL).some(field => field === false);
  };
  
  const handelLogin = async () => {
    if(validate()){
      await login(email, password);
    }

  
  }

  useEffect(()=>{
    setGlobalError('')
  },[])
  return (
    <>
      <FlutterMenu className={style.flutter} shadow={windowWidth >=600 ?'small': 'all'}>

        <MyImage alt='sds' src={logo} className={style.image} />
        <div >
          <InputRow label='Email' > 
  
            <MyInput
              placeholder='Email eingeben' name='email'
              type='email'
              className={style.input}
              value={email}
              onChange={setEmail}
            />
            {errors.email &&
              <div className={style.errorTextField}>Die E-Mail wurde falsch eingegeben </div>
            }
          
          </InputRow>
          
          <InputRow label='Passwort' >
            <MyInput

              placeholder='Passwort eingeben' name='password'
              type='password'
              className={style.input}
              value={password}
              onChange={setPassword}
            />
            {errors.password &&
              <div className={style.errorTextField}>Das Passwort darf nicht leer sein  </div>
            }
          </InputRow>
          {
            error &&
            <div className={style.errorText}>{error}</div>
          }


          <MyButton mode='black' className={style.button} onClick={handelLogin}>Anmelden</MyButton>
          <Link to='/passwort-vergessen' className={style.passwordVergessen}>Hast du dein Passwort vergessen?</Link>
        </div>
       
      </FlutterMenu >
    </ >
  )
}

export default LoginForm
