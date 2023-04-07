import { Router } from '../route/router';
import { AuthorizationPage } from '../pages/authorization/authorization';
import { RegistrationPage } from '../pages/registration/registration';
import { InformationPage } from '../pages/information/information';
import { ChatPage } from '../pages/chat/chat';
import { ChangePasswordPage } from '../pages/changes/password/password';
import { ChangeDataPage } from '../pages/changes/data/data';
import { Error404Page } from '../pages/errors/404/error404';
import { Error500Page } from '../pages/errors/500/error500';

enum NavString {
    Authorization = '/',
    Registration = '/sign-up',
    Information = '/settings',
    Error404 = '/404',
    Error500 = '/500',
    Messenger = '/messenger',
    ChangePassword = '/setting-password',
    ChangeData = '/setting-data'
}

export class NavigationRouter {
    public static initRouter(): void {
        Router
            .use(NavString.Authorization, AuthorizationPage)
            .use(NavString.Registration, RegistrationPage)
            .use(NavString.Information, InformationPage)
            .use(NavString.Messenger, ChatPage)
            .use(NavString.ChangePassword, ChangePasswordPage)
            .use(NavString.ChangeData, ChangeDataPage)
            .use(NavString.Error404, Error404Page)
            .use(NavString.Error500, Error500Page);
    }
}

export const NavPath = NavString;
export const Navigation = NavigationRouter;
