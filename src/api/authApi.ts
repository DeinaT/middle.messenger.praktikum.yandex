import BaseApi from './baseApi';
import UserAuthorization from '../model/userAuthorization';
import UserRegistration from '../model/userRegistration';
import User from '../model/user';

export class AuthApi extends BaseApi {
    constructor() {
        super('/auth');
    }

    signin(data: UserAuthorization) {
        return this.http.post('/signIn', data);
    }

    signup(data: UserRegistration) {
        return this.http.post('/signUp', data);
    }

    read(): Promise<User> {
        return this.http.get('/user');
    }

    logout() {
        return this.http.post('/logout');
    }
}
