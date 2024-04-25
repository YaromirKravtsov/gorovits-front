import React, { FC, ReactNode, Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { RouteNames, publicRoutes } from '../../router';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { useActions } from '../../../hooks/useActions';
import { AuthActionCreators } from '../../state/auth/action-creators';
import Loader from '../../../UI/Loader/Loader';
import AuthService from '../../api/service/AuthService';
import FlutterMenu from '../../../UI/FlutterMenu/FlutterMenu';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
interface AuthGuardProps {
    children: ReactNode
}
const AuthGuard: FC<AuthGuardProps> = (props) => {

    const { isAuth, isLoading } = useTypedSelector(state => state.auth);
    const { role, userInfo } = useTypedSelector(state => state.user);
    const { checkAuth, setIsLoadingAuth } = useActions();
    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            checkAuth();
        } else {
            setIsLoadingAuth(false)
        }




    }, [])

    const [isNew, setIsNew] = useState<boolean>(false)
    useEffect(() => {
        const fetch = async () => {


            const { data } = await AuthService.getIsNew(userInfo.userId as number)
            setIsNew(data);
        }
        if (!isLoading && userInfo.userId) {
            fetch()
        }
    }, [userInfo.userId])
    return (
        <>
            {(isAuth && (role === 'admin' || role === 'user')) ?
                <>
                    {isNew &&
                      <PrivacyPolicy setIsNew = {setIsNew}/>
                    }
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
                                    element={<Suspense fallback={<Loader />}><route.element /></Suspense>}
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
