import UserAPI from "../api/userApi";
import UserData from "../model/userData";
import UserPassword from "../model/userPassword";
import AuthController from "./authController";
import User from "../objects/user";

export class UserController {
    private readonly api: UserAPI;

    constructor() {
        this.api = new UserAPI();
    }

    async changeProfile(data: UserData) {
        try {
            await this.api.changeProfile(data);
            AuthController.fetchUser();
        } catch (e: any) {
            console.error(e);
        }
    }

    async changePassword(data: UserPassword) {
        try {
            await this.api.changePassword(data);
            AuthController.fetchUser();
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

    async findUserByLogin(login: string): Promise<User[]> {
        try {
            return await this.api.findUserByLogin(login);
        } catch (e: any) {
            console.error(e);
        }
        return [];
    }
}

export default new UserController();
