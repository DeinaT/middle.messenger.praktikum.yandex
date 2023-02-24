import template from './changes-password.hbs';
import '../../../components/button/button.ts'
import '../../../components/input/input.ts'
import '../../../css/style.sass'
import Block from "../../../utils/Block";
import {Input} from "../../../components/input/input";
import {Button} from "../../../components/button/button";

class ChangePasswordPage extends Block {
    constructor() {
        super('main', null);
    }

    init() {

        this.children.input_old_password = new Input({
            input__name: "oldPassword",
            input__placeholder: "Старый пароль",
            input__is_password: true,
        });

        this.children.input_new_password = new Input({
            input__name: "newPassword",
            input__placeholder: "Новый пароль",
            input__is_password: true,
        });

        this.children.input_new_password_repeat = new Input({
            input__name: "newPasswordRepeat",
            input__placeholder: "Повторите новый пароль",
            input__is_password: true,
        });

        this.children.button_cancel = new Button({
            button__text: "Отмена",
            button__state: "neutral",
            events: {
                click: () => {
                    // todo validate
                },
            },
        });

        this.children.button_save = new Button({
            button__text: "Сохранить",
            button__state: "positive",
            events: {
                click: () => {
                    // todo validate
                },
            },
        });
        this.children.button_cancel.getContent()!.style.width = "45%"
        this.children.button_save.getContent()!.style.width = "45%"
    }

    render() {
        return this.compile(template, this.props);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const changes_password = document.querySelector('#changes_password');

    const changePasswordPage = new ChangePasswordPage();
    changes_password!.append(changePasswordPage.getContent()!);

    changePasswordPage.dispatchComponentDidMount();
});
