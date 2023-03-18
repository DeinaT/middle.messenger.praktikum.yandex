import InformationPage from "../pages/information/information";
import Error404Page from "../pages/errors/404/error404";
import Error500Page from "../pages/errors/500/error500";
import AuthorizationPage from "../pages/authorization/authorization";
import RegistrationPage from "../pages/registration/registration";
import Router from "../route/router";
import ChatPage from "../pages/chat/chat";
import ChangePasswordPage from "../pages/changes/password/password";
import ChangeDataPage from "../pages/changes/data/data";

export enum NavString {
    AUTHORIZATION = "/",
    REGISTRATION = "/sign-up",
    INFORMATION = "/setting",
    ERROR_404 = "/404",
    ERROR_500 = "/500",
    MESSENGER = "/messenger",
    CHANGE_PASSWORD = "/setting-password",
    CHANGE_DATA = "/setting-data"
}

export class Navigation {
    static sjsjs=0;
    public  static getSSS():number{
        this.sjsjs++;
        return this.sjsjs;
    }
    public static initRouter(): void {
        Router
            .use(NavString.AUTHORIZATION, AuthorizationPage)
            .use(NavString.REGISTRATION, RegistrationPage)
            .use(NavString.INFORMATION, InformationPage)
            .use(NavString.MESSENGER, ChatPage)
            .use(NavString.CHANGE_PASSWORD, ChangePasswordPage)
            .use(NavString.CHANGE_DATA, ChangeDataPage)
            .use(NavString.ERROR_404, Error404Page)
            .use(NavString.ERROR_500, Error500Page)
    }
}

export default Navigation;
