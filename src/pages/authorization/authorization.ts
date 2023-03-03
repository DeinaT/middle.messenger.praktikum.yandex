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
        this.children.input_login = ConstructionDefault.getDefaultNotEmptyInput('login', 'Логин');

        this.children.input_password = ConstructionDefault.getDefaultPasswordInput(
            'password',
            'Пароль',
            () => Validation.isEmptyInput(this.children.input_password as Input),
        );

        this.children.button = new Button({
            button__text: 'Войти',
            button__state: 'neutral',
            button__type: 'submit',
        });

        this.children.label_reg = new Label({
            label__text: 'Нет аккаунта?',
            events: {
                click: () => {
                    window.location.href = '../../' + Navigation.registration;
                },
            },
        });

        this.children.label_reg.getContent()!.style.marginTop = '15px';

        this.setClassForEvent('for_event_form');

        this.props.checkInput = [
            this.children.input_login,
            this.children.input_password,
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
