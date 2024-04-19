import React, { FC, ReactNode, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouteNames, publicRoutes } from '../../router';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { AuthActionCreators } from '../../state/auth/action-creators';
import Loader from '../../../UI/Loader/Loader';
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
                                  element={<Suspense fallback={<Loader/>}><route.element /></Suspense>}
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
