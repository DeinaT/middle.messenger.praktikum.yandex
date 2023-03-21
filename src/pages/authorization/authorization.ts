import '../../css/style.sass';
import template from './authorization.hbs';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Label from '../../components/label/label';
import Navigation from '../../utils/navigation';
import ConstructionDefault from '../../utils/validation/constructionDefault';
import Validation from '../../utils/validation/validation';
import FormPage from '../../utils/validation/formPage';
import UserAuthorization from '../../objects/userAuthorization';

class AuthorizationPage extends FormPage {
    constructor() {
        super(formData => {
            const data: UserAuthorization = new UserAuthorization(formData);
            console.log(data);
        });
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
                    window.location.href = '../../' + Navigation.registration;
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

window.addEventListener('DOMContentLoaded', () => {
    const authorization = document.querySelector('#authorization');

    const authorizationPage = new AuthorizationPage();
    authorization!.append(authorizationPage.getContent()!);

    authorizationPage.dispatchComponentDidMount();
});
