import '../../css/style.sass'
import Block from "../../utils/Block";
import template from './authorization.hbs';
import {Input} from "../../components/input/input";
import {Button} from "../../components/button/button";

class AuthorizationPage extends Block {
    constructor() {
        super('main', null);
    }

    init() {
        this.children.input_login = new Input({
            input__name: "login",
            input__placeholder: "Логин",
        });

        this.children.input_password = new Input({
            input__name: "password",
            input__placeholder: "Пароль",
            input__is_password: true,
        });

        this.children.button = new Button({
            button__text: "Войти",
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
    const authorization = document.querySelector('#authorization');

    const authorizationPage = new AuthorizationPage();
    authorization!.append(authorizationPage.getContent()!);

    authorizationPage.dispatchComponentDidMount();
});
