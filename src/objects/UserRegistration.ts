export class UserRegistration {
    email: string | undefined;
    login: string | undefined;
    first_name: string | undefined;
    second_name: string | undefined;
    phone: string | undefined;
    password: string | undefined;

    constructor(email: string | null, login: string | null,
                first_name: string | null, second_name: string | null,
                phone: string | null, password: string | null) {
        if (email !== null)
            this.email = email;
        if (login !== null)
            this.login = login;
        if (first_name !== null)
            this.first_name = first_name;
        if (second_name !== null)
            this.second_name = second_name;
        if (phone !== null)
            this.phone = phone;
        if (password !== null)
            this.password = password;
    }
}
