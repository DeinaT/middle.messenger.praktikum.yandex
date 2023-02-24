import '../../css/style.sass'
import Block from "../../utils/Block";
import template from './authorization.hbs';
import Input from "../../components/input/input";
import {Button} from "../../components/button/button";
import {ConstructionDefault} from "../../utils/validation/ConstructionDefault";
import {Validation} from "../../utils/validation/Validation";

class AuthorizationPage extends Block {
    constructor() {
        super('main', null);
    }

    init() {
        this.children.input_login = ConstructionDefault.getDefaultNotEmptyInput("login", "Логин");

        this.children.input_password = ConstructionDefault.getDefaultPasswordInput(
            "password",
            "Пароль",
            () => Validation.isEmptyInput(this.children.input_password as Input)
        );

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
