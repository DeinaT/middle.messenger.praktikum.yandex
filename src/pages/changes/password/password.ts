import template from './password.hbs';
import '../../../components/button/button.ts';
import '../../../components/input/input.ts';
import '../../../css/style.sass';
import Input from '../../../components/input/input';
import Button from '../../../components/button/button';
import ConstructionDefault from '../../../utils/validation/constructionDefault';
import Validation from '../../../utils/validation/validation';
import FormPage from '../../../utils/validation/formPage';
import UserPassword from '../../../objects/userPassword';
import Navigation from '../../../utils/navigation';

class ChangePasswordPage extends FormPage {
    constructor() {
        super((formData) => {
            const data: UserPassword = new UserPassword(formData);
            console.log(data);
        });
    }

    init() {
        this.children.input_old_password = ConstructionDefault.getDefaultPasswordInput(
            'old_password',
            'Старый пароль',
            () => Validation.isEmptyInput(this.children.input_old_password as Input),
        );

        this.children.input_new_password = ConstructionDefault.getDefaultPasswordInput(
            'password',
            'Новый пароль',
            () => Validation.checkFirstPassword(this.children.input_new_password as Input,
                this.children.input_new_password_repeat as Input),
        );

        this.children.input_new_password_repeat = ConstructionDefault.getDefaultPasswordInput(
            'password_repeat',
            'Повторите новый пароль',
            () => Validation.checkTwoPassword(this.children.input_new_password as Input,
                this.children.input_new_password_repeat as Input),
        );

        this.children.button_cancel = new Button({
            button__text: 'Отмена',
            button__state: 'neutral',
            events: {
                click: () => {
                    window.location.href = '../../../' + Navigation.information;
                },
            },
        });

        this.children.button_save = new Button({
            button__text: 'Сохранить',
            button__state: 'positive',
            button__type: 'submit',
        });
        this.children.button_cancel.getContent()!.style.width = '45%';
        this.children.button_save.getContent()!.style.width = '45%';

        this.setClassForEvent('for_event_form');

        this.props.checkInput = [
            this.children.input_old_password,
            this.children.input_new_password,
        ];
    }

    render() {
        return this.compile(template, this.props);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const changesPassword = document.querySelector('#changes_password');

    const changePasswordPage = new ChangePasswordPage();
    changesPassword!.append(changePasswordPage.getContent()!);

    changePasswordPage.dispatchComponentDidMount();
});
