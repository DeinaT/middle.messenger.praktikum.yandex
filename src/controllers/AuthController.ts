import AuthApi from '../api/authApi';
import Router from '../route/router';
import {NavString} from "../utils/navigation";
import UserAuthorization from "../objects/userAuthorization";
import UserRegistration from "../objects/userRegistration";
import store from "../objects/store";

export class AuthController {
    private readonly api: AuthApi;

    constructor() {
        this.api = new AuthApi();
    }

    async signin(data: UserAuthorization) {
        try {
            await this.api.signin(data);

            Router.go(NavString.MESSENGER);
        } catch (e: any) {
            console.error(e);
        }
    }

    async signup(data: UserRegistration) {
        try {
            await this.api.signup(data);

            await this.fetchUser();

            Router.go(NavString.MESSENGER);
        } catch (e: any) {
            console.error(e);
        }
    }

    async fetchUser() {
        const user = await this.api.read();

        store.set('user', user);
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
