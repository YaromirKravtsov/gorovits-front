import React, { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RouteNames, adminRoutes, publicRoutes, userRoutes } from '.';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Loader from '../../UI/Loader/Loader';

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    const {role} = useTypedSelector(state => state.user)
    
    return (
        <Routes>
            {(role === 'admin') && (
                <>
                    {adminRoutes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={   <Suspense fallback={<Loader/>}><route.element /></Suspense>}
                        />
                    ))}
                    <Route path="*" element={<Navigate to={RouteNames.NEUER_BENUTZER} replace />} />
                </>
            )}
            {(role === 'user') && (
                <>
                    {userRoutes.map((route) => (
                     <Route
                            key={route.path}
                            path={route.path}
                            element={ <Suspense fallback={<Loader/>}><route.element /></Suspense>}
                        />
                      
                    ))}
                     
                    <Route path="*" element={<Navigate to={RouteNames.KUNDENKONTO} replace />} />
                </>
            )}
            <Route path="*" element={<Navigate to={RouteNames.LOGIN} replace />} />
        </Routes>
    );
};


export default AppRouter;
