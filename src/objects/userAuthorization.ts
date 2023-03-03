export class UserAuthorization {
    login: string | undefined;

    password: string | undefined;

    constructor(data: FormData) {
        this.login = data.get('login') as string;
        this.password = data.get('password') as string;
    }
}

export default UserAuthorization;
