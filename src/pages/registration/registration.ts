import template from './registration.hbs';
import '../../components/button/button.ts';
import '../../components/input/input.ts';
import '../../css/style.sass';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Label from '../../components/label/label';
import Validation from '../../utils/validation/validation';
import UserRegistration from '../../model/userRegistration';
import ConstructionDefault from '../../utils/validation/constructionDefault';
import FormPage from '../../utils/validation/formPage';
import AuthController from "../../controllers/authController";
import Router from "../../route/router";
import {NavString} from "../../utils/navigation";

class RegistrationPage extends FormPage {
    constructor() {
        super(formData => {
            AuthController.signUp(new UserRegistration(formData));
        });
    }

    init() {
        this.children.inputEmail = ConstructionDefault.getDefaultEmailInput();

        this.children.inputLogin = ConstructionDefault.getDefaultNotEmptyInput('login', 'Логин');
        this.children.inputFirstName = ConstructionDefault.getDefaultNotEmptyInput('first_name', 'Имя');
        this.children.inputSecondName = ConstructionDefault.getDefaultNotEmptyInput('second_name', 'Фамилия');
        this.children.inputPhone = ConstructionDefault.getDefaultTelephoneInput();

        this.children.inputPassword = ConstructionDefault.getDefaultPasswordInput(
            'password',
            'Пароль',
            () => Validation.checkFirstPassword(this.children.inputPassword as Input,
                this.children.inputPasswordRepeat as Input),
        );

        this.children.inputPasswordRepeat = ConstructionDefault.getDefaultPasswordInput(
            'password_repeat',
            'Пароль (еще раз)',
            () => Validation.checkTwoPassword(this.children.inputPassword as Input,
                this.children.inputPasswordRepeat as Input),
        );

        this.children.labelEntry = new Label({
            labelText: 'Войти',
            events: {
                click: () => {
                    Router.go(NavString.AUTHORIZATION)
                },
            },
        });
        this.children.labelEntry.getContent()!.style.marginTop = '15px';

        this.children.button = new Button({
            buttonText: 'Зарегистрироваться',
            buttonState: 'neutral',
            buttonType: 'submit',
        });

        this.setClassForEvent('for_event_form');

        this.props.checkInput = [
            this.children.inputEmail,
            this.children.inputLogin,
            this.children.inputFirstName,
            this.children.inputSecondName,
            this.children.inputPhone,
            this.children.inputPassword,
            this.children.inputPasswordRepeat,
        ];
    }

    show(): void {
        this.getContent()!.style.display = 'block';
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default RegistrationPage;
