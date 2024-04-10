import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { RouteNames, adminRoutes, publicRoutes, userRoutes } from '.';
import { useTypedSelector } from '../../hooks/useTypedSelector';

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
                            element={<route.element />}
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
                            element={<route.element />}
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
