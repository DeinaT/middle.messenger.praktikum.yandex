import '../../css/style.sass';
import template from './authorization.hbs';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Label from '../../components/label/label';
import ConstructionDefault from '../../utils/validation/constructionDefault';
import Validation from '../../utils/validation/validation';
import FormPage from '../../utils/validation/formPage';
import UserAuthorization from '../../objects/userAuthorization';
import Router from "../../route/router";
import AuthController from "../../controllers/authController";
import {NavString} from "../../utils/navigation";

class AuthorizationPage extends FormPage {
    constructor() {
        super(formData => {
            AuthController.signin(new UserAuthorization(formData));
        });
        try {
            AuthController.fetchUser().then(user => {
                if (user.id !== 0)
                Router.go(NavString.MESSENGER);
            });
        } catch (e: any) {
        }
    }

    init() {
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
                    Router.go(NavString.REGISTRATION)
                },
            },
        });

        this.children.labelReg.getContent()!.style.marginTop = '15px';

        this.setClassForEvent('for_event_form');

        this.props.checkInput = [
            this.children.inputLogin,
            this.children.inputPassword,
        ];
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default AuthorizationPage;
