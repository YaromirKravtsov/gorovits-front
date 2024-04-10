import React, { FC, ReactNode, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouteNames, publicRoutes } from '../../router';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { AuthActionCreators } from '../../state/auth/action-creators';
interface AuthGuardProps {
    children: ReactNode
}
const AuthGuard: FC<AuthGuardProps> = (props) => {

    const {isAuth,isLoading} = useTypedSelector(state => state.auth);
    const {role} = useTypedSelector(state => state.user);
    const {checkAuth,setIsLoadingAuth} = useActions();
    useEffect(()=>{
      if (localStorage.getItem('token') !== null) {
        checkAuth();
      }else{
        setIsLoadingAuth(false)
      }
    },[])
    console.log(isLoading)
    return (
      <>
          {(isAuth && (role === 'admin' || role === 'user') ) ?
              <>
                  {props.children}
              </>
              :
              (!isLoading && (
                  <>
                      <Routes>
                          {publicRoutes.map((route) => (
                              <Route
                                  key={route.path}
                                  path={route.path}
                                  element={<route.element />}
                              />
                          ))}
                          <Route path="*" element={<Navigate to={RouteNames.LOGIN} replace />} />
                      </Routes>
                  </>
              ))
          }
      </>
  );
}


export default AuthGuard
