import React, { useEffect } from 'react'

import './App.css'
import AuthGuard from './app/components/AuthGuard/AuthGuard'
import AppRouter from './app/router/AppRouter'
import NavBar from './app/components/NavBar/NavBar'
import AppLayout from './components/Layout/AppLayout/AppLayout'
import Content from './components/Layout/Content/Content'
import ErrorInterceptor from './app/components/ErrorInterceptor/ErrorInterceptor'
import { useActions } from './hooks/useActions'
import $api from './app/api/http'
import { navBarAdaptive } from './constants/adaptive'


export default function App() {
  const {setWindowWidth,setIsNavOpen,setWindowHight} = useActions();
  useEffect(() => {
    const handleResize = () =>{
      const ww = window.innerWidth
      setIsNavOpen(ww >= navBarAdaptive);
      setWindowWidth(window.innerWidth)
      setWindowHight(window.innerHeight)
    }
    handleResize()

    const fetch = async() =>{
        await $api.get('token/params',{params:{
          width: window.innerWidth,
          height: window.innerHeight
        }})
    }
    fetch()
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])
  


  return (
    <AuthGuard>
      <ErrorInterceptor>
        <AppLayout/>
      </ErrorInterceptor>
    </AuthGuard>
  )
}