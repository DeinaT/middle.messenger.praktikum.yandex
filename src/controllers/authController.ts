import {AuthApi} from '../api/authApi';
import {Router} from '../route/router';
import UserAuthorization from '../model/userAuthorization';
import UserRegistration from '../model/userRegistration';
import store from '../model/store';
import {NavPath} from "../utils/navigation";
import {MessagesController} from "./messagesController";

class AuthControllerMain {
    private readonly api: AuthApi;

    constructor() {
        this.api = new AuthApi();
    }

    async signIn(data: UserAuthorization) {
        await this.api.signin(data).then(() => {
            Router.go(NavPath.Messenger);

            store.set('errorUserAuthorization', false);
        }, () => {
            store.set('errorUserAuthorization', true);
        });
    }

    async signUp(data: UserRegistration) {
        await this.api.signup(data).then(() => {

            this.startFetchUser();

            store.set('errorUserRegistration', false);
        }, () => {
            store.set('errorUserRegistration', true);
        });
    }

    public startFetchUser() {
        this.fetchUser().then(() => {
                Router.go(NavPath.Messenger);
            },
            () => {
                Router.go(NavPath.Authorization);
            });
    }

    async fetchUser() {
        await this.api.read().then(user => {
            store.set('user', user);
        });
    }

    async logout() {
        try {
            await this.api.logout();
            store.clear();
            Router.go(NavPath.Authorization);
            MessagesController.closeAll();
        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export const AuthController = new AuthControllerMain();
