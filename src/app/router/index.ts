import React from 'react';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';

const LoginPage = React.lazy(() => import('../../pages/LoginPage/LoginPage'));
const ForgotPasswordPage = React.lazy(() => import('../../pages/ForgotPasswordPage/ForgotPasswordPage'));
const KundenkontoPage = React.lazy(() => import('../../pages/KundenkontoPage/components/KundenkontoPage/KundenkontoPage'));
const TerminePage = React.lazy(() => import('../../pages/TerminePage/components/TerminePage/TerminePage'));
const BesaitungAndTuning = React.lazy(() => import('../../pages/BesaitungAndTuning/components/BesaitungAndTuningPage/BesaitungAndTuning'));
const UserPullingHistory = React.lazy(() => import('../../pages/UserPullingHistory/components/UserPullingHistory/UserPullingHistory'));
const RacketPullingStoryPage = React.lazy(() => import('../../pages/RacketPullingStory/RacketPullingStoryPage'));
const NewUserPage = React.lazy(() => import('../../pages/NewUserPage/NewUserPage'));
const AccountPageToAdmin = React.lazy(() => import('../../pages/AccountPageToAdmin/components/AccountPageToAdmin/AccountPageToAdmin'));
const AllCurrentOrders = React.lazy(() => import('../../pages/AllCurrentOrders/components/AllCurrentOrders'));
const SearchKundenPage = React.lazy(() => import('../../pages/SearchKundenPage/components/SearchKundenPage/SearchKundenPage'));
const AdminRecordGroup = React.lazy(() => import('../../pages/AdminRecordGroup/components/AdminRecordGroup/AdminRecordGroup'));
const UserRecordsStoryPage = React.lazy(() => import('../../pages/UserRecordsStoryPage/components/UserRecordsStoryPage'));
const AdminSettingsPage = React.lazy(() => import('../../pages/AdminSettingsPage/components/AdminSettingsPage'));
const OrderPage = React.lazy(() => import('../../modules/Ordering/components/OrderPage/OrderPage'));


export interface IRoute{
    path:string;
    element: React.ComponentType;

}
export enum RouteNames{
    LOGIN = '/login',
    KUNDENKONTO = '/account',
    FORGOT_PASSWORD = '/passwort-vergessen',
    BESAITUNG_AND_TUNING = '/tennistasche',
    TERMINE = '/termine',
    BESAITUNG_DES_BENUTZERS= '/besaitungen-des-benutzers',
    BesaitungsverlauFürSchläger= '/besaitungsverlauf-für-Schläger',
    NEUER_BENUTZER= '/neuer-benutzer',
    ACCOUNT_TO_ADMIN= '/user-account/:userId',
    ALL_CURRENT_ORDERS= '/current-orders',
    SEARCH_KUNDEN= '/kunden',
    BESTELLUNG=  '/bestellung',
    BENUTZER_BESTELLUNG=  '/benutzer-bestellung',
    EINSTELLUNGEN=  '/einstellungen',
    Terminbuchung ="/terminbuchung/:type",
    RESET_PASSWORD ="/passwort-zurücksetzen/:resetToken"
}
export const adminRoutes:IRoute[] = [
    {path: RouteNames.NEUER_BENUTZER, element: NewUserPage},
    {path: RouteNames.ACCOUNT_TO_ADMIN, element: AccountPageToAdmin},
    {path: RouteNames.ALL_CURRENT_ORDERS, element: AllCurrentOrders},
    {path: RouteNames.SEARCH_KUNDEN, element: SearchKundenPage},
    {path: RouteNames.BESTELLUNG, element: AdminRecordGroup},
    {path: RouteNames.BENUTZER_BESTELLUNG, element: UserRecordsStoryPage},
    {path: RouteNames.EINSTELLUNGEN, element: AdminSettingsPage},
]
/*  */
export const userRoutes:IRoute[] = [
    {path: RouteNames.BESAITUNG_AND_TUNING, element: BesaitungAndTuning},
    {path: RouteNames.KUNDENKONTO, element: KundenkontoPage},
    {path: RouteNames.TERMINE, element: TerminePage},
    {path: RouteNames.BESAITUNG_DES_BENUTZERS, element: UserPullingHistory},
    {path: RouteNames.BesaitungsverlauFürSchläger, element: RacketPullingStoryPage},
    {path: RouteNames.Terminbuchung , element: OrderPage},
]


export const publicRoutes:IRoute[] =[
    {path: RouteNames.LOGIN, element: LoginPage},
    {path: RouteNames.FORGOT_PASSWORD, element: ForgotPasswordPage},
    {path: RouteNames.RESET_PASSWORD, element: ResetPassword}
]