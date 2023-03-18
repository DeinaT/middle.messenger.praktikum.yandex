export class User {
    // по заданию надо отправлять по такой структуре, поэтому не camelCase
    id: number | undefined;

    email: string;

    login: string;

    first_name: string;

    second_name: string;

    phone: string;

    avatar: string | undefined;

    display_name: string;

    constructor(data: FormData) {
        this.email = data.get('email') as string;
        this.login = data.get('login') as string;
        this.first_name = data.get('first_name') as string;
        this.second_name = data.get('second_name') as string;
        this.phone = data.get('phone') as string;
        this.display_name = data.get('display_name') as string;
    }
}

export default User;
