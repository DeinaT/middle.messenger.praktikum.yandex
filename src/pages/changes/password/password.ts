import template from './password.hbs';
import '../../../components/button/button.ts';
import '../../../components/input/input.ts';
import '../../../css/style.sass';
import Input from '../../../components/input/input';
import Button from '../../../components/button/button';
import ConstructionDefault from '../../../utils/validation/constructionDefault';
import Validation from '../../../utils/validation/validation';
import FormPage from '../../../utils/validation/formPage';
import UserPassword from '../../../model/userPassword';
import {Router} from '../../../route/router';
import {UserController} from "../../../controllers/userController";

export class ChangePasswordPage extends FormPage {
    constructor() {
        super((formData) => {
            UserController.changePassword(new UserPassword(formData))
        });
    }

    init() {
        this.children.inputOldPassword = ConstructionDefault.getDefaultPasswordInput(
            'old_password',
            'Старый пароль',
            () => Validation.isEmptyInput(this.children.inputOldPassword as Input),
        );

        this.children.inputNewPassword = ConstructionDefault.getDefaultPasswordInput(
            'password',
            'Новый пароль',
            () => Validation.checkFirstPassword(this.children.inputNewPassword as Input,
                this.children.inputNewPasswordRepeat as Input),
        );

        this.children.inputNewPasswordRepeat = ConstructionDefault.getDefaultPasswordInput(
            'password_repeat',
            'Повторите новый пароль',
            () => Validation.checkTwoPassword(this.children.inputNewPassword as Input,
                this.children.inputNewPasswordRepeat as Input),
        );

        this.children.buttonCancel = new Button({
            buttonText: 'Отмена',
            buttonState: 'neutral',
            events: {
                click: () => {
                    Router.back();
                },
            },
        });

        this.children.buttonSave = new Button({
            buttonText: 'Сохранить',
            buttonState: 'positive',
            buttonType: 'submit',
        });
        this.children.buttonCancel.getContent()!.style.width = '45%';
        this.children.buttonSave.getContent()!.style.width = '45%';

        this.setClassForEvent('for_event_form');

        this.props.checkInput = [
            this.children.inputOldPassword,
            this.children.inputNewPassword,
        ];
    }

    render() {
        return this.compile(template, this.props);
    }
}
