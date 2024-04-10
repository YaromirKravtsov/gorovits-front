import React from 'react'

import style from './LoginPage.module.css'
import { Helmet } from 'react-helmet'
import LoginForm from './components/LoginForm/LoginForm'
const LoginPage = () => {
  return (
    <div className={style.page}>
      <Helmet>
      <title>Login</title>
    </Helmet>
        <LoginForm/>
    </div>
  )
}

export default LoginPage;
