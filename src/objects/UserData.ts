export class UserData {
    email: string | undefined;
    login: string | undefined;
    first_name: string | undefined;
    second_name: string | undefined;
    phone: string | undefined;
    display_name: string | undefined;

    constructor(data: FormData) {
        this.email = data.get("email") as string;
        this.login = data.get("login") as string;
        this.first_name = data.get("first_name") as string;
        this.second_name = data.get("second_name") as string;
        this.phone = data.get("phone") as string;
        this.display_name = data.get("display_name") as string;
    }
}
