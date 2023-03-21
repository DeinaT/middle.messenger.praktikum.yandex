export class UserPassword {
    password: string | undefined;

    constructor(data: FormData) {
        this.password = data.get('password') as string;
    }
}

export default UserPassword;
