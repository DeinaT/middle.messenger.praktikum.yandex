import UserAPI from "../api/userApi";
import UserData from "../model/userData";
import UserPassword from "../model/userPassword";

export class UserController {
    private readonly api: UserAPI;

    constructor() {
        this.api = new UserAPI();
    }

    async changeProfile(data: UserData) {
        try {
            await this.api.changeProfile(data);
        } catch (e: any) {
            console.error(e);
        }
    }

    async changePassword(data: UserPassword) {
        try {
            await this.api.changePassword(data);
        } catch (e: any) {
            console.error(e);
        }
    }

    async changeAvatar(data: File) {
        try {
            await this.api.changeAvatar(data);
        } catch (e: any) {
            console.error(e);
        }
    }
}

export default new UserController();
