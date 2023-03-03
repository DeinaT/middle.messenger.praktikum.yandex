import template from './registration.hbs';
import '../../components/button/button.ts';
import '../../components/input/input.ts';
import '../../css/style.sass';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Label from '../../components/label/label';
import Navigation from '../../utils/navigation';
import Validation from '../../utils/validation/validation';
import UserRegistration from '../../objects/userRegistration';
import ConstructionDefault from '../../utils/validation/constructionDefault';
import FormPage from '../../utils/validation/formPage';

class RegistrationPage extends FormPage {
    constructor() {
        super(formData => {
            let data: UserRegistration = new UserRegistration(formData);
            console.log(data);
        });
    }

    init() {
        this.children.input_email = ConstructionDefault.getDefaultEmailInput();

        this.children.input_login = ConstructionDefault.getDefaultNotEmptyInput('login', 'Логин');
        this.children.input_first_name = ConstructionDefault.getDefaultNotEmptyInput('first_name', 'Имя');
        this.children.input_second_name = ConstructionDefault.getDefaultNotEmptyInput('second_name', 'Фамилия');
        this.children.input_phone = ConstructionDefault.getDefaultTelephoneInput();

        this.children.input_password = ConstructionDefault.getDefaultPasswordInput(
            'password',
            'Пароль',
            () => Validation.checkFirstPassword(this.children.input_password as Input,
                this.children.input_password_repeat as Input),
        );

        this.children.input_password_repeat = ConstructionDefault.getDefaultPasswordInput(
            'password_repeat',
            'Пароль (еще раз)',
            () => Validation.checkTwoPassword(this.children.input_password as Input,
                this.children.input_password_repeat as Input),
        );

        this.children.label_entry = new Label({
            label__text: 'Войти',
            events: {
                click: () => {
                    window.location.href = '../../' + Navigation.authorization;
                },
            },
        });
        this.children.label_entry.getContent()!.style.marginTop = '15px';

        this.children.button = new Button({
            button__text: 'Зарегистрироваться',
            button__state: 'neutral',
            button__type: 'submit',
        });

        this.setClassForEvent('for_event_form');

        this.props.checkInput = [
            this.children.input_email,
            this.children.input_login,
            this.children.input_first_name,
            this.children.input_second_name,
            this.children.input_phone,
            this.children.input_password,
            this.children.input_password_repeat,
        ];
    }

    render() {
        return this.compile(template, this.props);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const registration = document.querySelector('#registration');

    const registrationPage = new RegistrationPage();
    registration!.append(registrationPage.getContent()!);

    registrationPage.dispatchComponentDidMount();
});
