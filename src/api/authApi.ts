import BaseApi from "./baseApi";
import UserAuthorization from "../objects/userAuthorization";
import UserRegistration from "../objects/userRegistration";
import User from "../objects/user";


export class AuthAPI extends BaseApi {
    constructor() {
        super('/auth');
    }

    signin(data: UserAuthorization) {
        return this.http.post('/signin', data);
    }


    signup(data: UserRegistration) {
        return this.http.post('/signup', data);
    }

    read(): Promise<User> {
        return this.http.get('/user');
    }

    logout() {
        return this.http.post('/logout');
    }

    create = undefined;
    update = undefined;
    delete = undefined;
}

export default AuthAPI;