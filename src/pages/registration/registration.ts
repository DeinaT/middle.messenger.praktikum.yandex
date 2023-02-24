import template from './registration.hbs';
import '../../components/button/button.ts'
import '../../components/input/input.ts'
import '../../css/style.sass'
import Block from "../../utils/Block";
import {Input} from "../../components/input/input";
import {Button} from "../../components/button/button";

class RegistrationPage extends Block {
    constructor() {
        super('main', null);
    }

    init() {
        this.children.input_email = new Input({
            input__name: "email",
            input__placeholder: "Почта",
        });

        this.children.input_login = new Input({
            input__name: "login",
            input__placeholder: "Логин",
        });

        this.children.input_first_name = new Input({
            input__name: "first_name",
            input__placeholder: "Имя",
        });

        this.children.input_second_name = new Input({
            input__name: "second_name",
            input__placeholder: "Фамилия",
        });

        this.children.input_phone = new Input({
            input__name: "phone",
            input__placeholder: "Телефон",
        });

        this.children.input_password = new Input({
            input__name: "password",
            input__placeholder: "Пароль",
            input__is_password: true,
        });

        this.children.input_password_repead = new Input({
            input__name: "password_repeat",
            input__placeholder: "Пароль",
            input__is_password: true,
        });

        this.children.button = new Button({
            button__text: "Зарегистрироваться",
            button__state: "neutral",
            events: {
                click: () => {
                    // todo validate
                },
            },
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const registration = document.querySelector('#registration');

    const registrationPage = new RegistrationPage();
    registration!.append(registrationPage.getContent()!);

    registrationPage.dispatchComponentDidMount();
});
