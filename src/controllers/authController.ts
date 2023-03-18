import AuthApi from '../api/authApi';
import Router from '../route/router';
import {NavString} from "../utils/navigation";
import UserAuthorization from "../model/userAuthorization";
import UserRegistration from "../model/userRegistration";
import store from "../objects/store";

export class AuthController {
    private readonly api: AuthApi;

    constructor() {
        this.api = new AuthApi();
    }

    async signIn(data: UserAuthorization) {
        await this.api.signin(data).then(() => {
            Router.go(NavString.MESSENGER);

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
        this.fetchUser().then(resolved => {
                store.set('user', resolved);
                Router.go(NavString.MESSENGER);
            },
            () => {
            });
    }

    async fetchUser() {
        await this.api.read();
    }

    async logout() {
        try {
            await this.api.logout();

            Router.go(NavString.AUTHORIZATION);
        } catch (e: any) {
            console.error(e.message);
        }
    }
}

export default new AuthController();
