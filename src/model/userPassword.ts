export class UserPassword {
    oldPassword: string | undefined;
    newPassword: string | undefined;

    constructor(data: FormData) {
        this.oldPassword = data.get('old_password') as string;
        this.newPassword = data.get('password') as string;
    }
}

export default UserPassword;
