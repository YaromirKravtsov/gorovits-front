import React from 'react'

import './App.css'
import AuthGuard from './app/components/AuthGuard/AuthGuard'
import AppRouter from './app/router/AppRouter'
import NavBar from './app/components/NavBar/NavBar'
import AppLayout from './components/Layout/AppLayout/AppLayout'
import Content from './components/Layout/Content/Content'
import ErrorInterceptor from './app/components/ErrorInterceptor/ErrorInterceptor'


export default function App() {
  console.log(window.innerWidth)
  console.log(window.innerHeight)
  return (
    <AuthGuard>
      <ErrorInterceptor>
        <AppLayout/>
      </ErrorInterceptor>
    </AuthGuard>
  )
}