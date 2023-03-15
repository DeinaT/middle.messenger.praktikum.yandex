import BaseApi from "./baseApi";
import UserData from "../objects/userData";
import UserPassword from "../objects/userPassword";


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

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}

export default UserAPI;
