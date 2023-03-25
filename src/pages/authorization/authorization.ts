import '../../css/style.sass';
import template from './authorization.hbs';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Label from '../../components/label/label';
import ConstructionDefault from '../../utils/validation/constructionDefault';
import Validation from '../../utils/validation/validation';
import FormPage from '../../utils/validation/formPage';
import UserAuthorization from '../../model/userAuthorization';
import {Router} from '../../route/router';
import {NavPath} from "../../utils/navigation";
import {AuthController} from "../../controllers/authController";

export class AuthorizationPage extends FormPage {
    constructor() {
        super(formData => {
            AuthController.signIn(new UserAuthorization(formData));
        }, state => {
            this.setTextError(state.errorUserAuthorization);
        });
        AuthController.startFetchUser();
    }

    init() {
        this.props.textError = '';
        this.children.inputLogin = ConstructionDefault.getDefaultNotEmptyInput('login', 'Логин');

        this.children.inputPassword = ConstructionDefault.getDefaultPasswordInput(
            'password',
            'Пароль',
            () => Validation.isEmptyInput(this.children.inputPassword as Input),
        );

        this.children.button = new Button({
            buttonText: 'Войти',
            buttonState: 'neutral',
            buttonType: 'submit',
        });

        this.children.labelReg = new Label({
            labelText: 'Нет аккаунта?',
            events: {
                click: () => {
                    Router.go(NavPath.Registration)
                },
            },
        });

        this.children.labelReg.getContent()!.style.marginTop = '15px';

        this.props.checkInput = [
            this.children.inputLogin,
            this.children.inputPassword,
        ];
    }

    private setTextError(value: boolean) {
        this.props.textError = (value) ? 'Неверный логин или пароль' : '';
    }

    show() {
        this.setTextError(false);
        super.show();
    }

    render() {
        return this.compile(template, this.props);
    }
}
