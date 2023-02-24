import template from './changes-password.hbs';
import '../../../components/button/button.ts'
import '../../../components/input/input.ts'
import '../../../css/style.sass'
import Block from "../../../utils/Block";
import Input from "../../../components/input/input";
import {Button} from "../../../components/button/button";
import {ConstructionDefault} from "../../../utils/validation/ConstructionDefault";
import {Validation} from "../../../utils/validation/Validation";

class ChangePasswordPage extends Block {
    constructor() {
        super('main', null);
    }

    init() {
        this.children.input_old_password = ConstructionDefault.getDefaultPasswordInput(
            "oldPassword",
            "Старый пароль",
            () => Validation.isEmptyInput(this.children.input_old_password as Input)
        );

        this.children.input_new_password = ConstructionDefault.getDefaultPasswordInput(
            "newPassword",
            "Новый пароль",
            () => Validation.checkFirstPassword(this.children.input_new_password as Input,
                this.children.input_new_password_repeat as Input)
        );

        this.children.input_new_password_repeat = ConstructionDefault.getDefaultPasswordInput(
            "newPasswordRepeat",
            "Повторите новый пароль",
            () => Validation.checkTwoPassword(this.children.input_new_password as Input,
                this.children.input_new_password_repeat as Input)
        );

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
