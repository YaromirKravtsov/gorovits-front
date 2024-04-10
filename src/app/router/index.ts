import KundenkontoPage from "../../pages/KundenkontoPage/components/KundenkontoPage/KundenkontoPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage/ForgotPasswordPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import TerminePage from "../../pages/TerminePage/components/TerminePage/TerminePage";
import BesaitungAndTuning from "../../pages/BesaitungAndTuning/components/BesaitungAndTuningPage/BesaitungAndTuning";
import UserPullingHistory from "../../pages/UserPullingHistory/components/UserPullingHistory/UserPullingHistory";
import RacketPullingStoryPage from "../../pages/RacketPullingStory/RacketPullingStoryPage";
import NewUserPage from "../../pages/NewUserPage/NewUserPage";
import AccountPageToAdmin from "../../pages/AccountPageToAdmin/components/AccountPageToAdmin/AccountPageToAdmin";
import AllCurrentOrders from "../../pages/AllCurrentOrders/components/AllCurrentOrders";
import SearchKundenPage from "../../pages/SearchKundenPage/components/SearchKundenPage/SearchKundenPage";
import AdminRecordGroup from "../../pages/AdminRecordGroup/components/AdminRecordGroup/AdminRecordGroup";
import UserRecordsStoryPage from "../../pages/UserRecordsStoryPage/components/UserRecordsStoryPage";
import AdminSettingsPage from "../../pages/AdminSettingsPage/components/AdminSettingsPage";



export interface IRoute{
    path:string;
    element: React.ComponentType;

}
export enum RouteNames{
    LOGIN = '/login',
    KUNDENKONTO = '/account',
    FORGOT_PASSWORD = '/passwort-vergessen',
    BESAITUNG_AND_TUNING = '/besaitung-tuning',
    TERMINE = '/termine',
    BESAITUNG_DES_BENUTZERS= '/besaitungen-des-benutzers',
    BesaitungsverlauFürSchläger= '/besaitungsverlauf-für-Schläger/:id',
    NEUER_BENUTZER= '/neuer-benutzer',
    ACCOUNT_TO_ADMIN= '/user-account/:userId',
    ALL_CURRENT_ORDERS= '/current-orders',
    SEARCH_KUNDEN= '/kunden',
    BESTELLUNG=  '/bestellung',
    BENUTZER_BESTELLUNG=  '/benutzer-bestellung',
    EINSTELLUNGEN=  '/einstellungen',
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
]


export const publicRoutes:IRoute[] =[
    {path: RouteNames.LOGIN, element: LoginPage},
    {path: RouteNames.FORGOT_PASSWORD, element: ForgotPasswordPage}
]