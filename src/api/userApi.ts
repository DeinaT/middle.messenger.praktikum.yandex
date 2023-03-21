import BaseApi from "./baseApi";
import UserData from "../model/userData";
import UserPassword from "../model/userPassword";
import User from "../objects/user";


export class UserAPI extends BaseApi {
    constructor() {
        super('/user');
    }

    changeProfile(data: UserData) {
        return this.http.put('/profile', data);
    }

    changePassword(data: UserPassword) {
        return this.http.put('/password', data);
    }

    changeAvatar(data: File) {
        let avatar = new FormData();
        avatar.append("avatar", data);
        return this.http.put('/profile/avatar', avatar);
    }

    findUserByLogin(login: string): Promise<User[]> {
        return this.http.post('/search', {login: login});
    }

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}

export default UserAPI;
