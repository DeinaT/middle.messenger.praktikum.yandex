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
                    window.location.href = '../../../' + Navigation.information;
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

window.addEventListener('DOMContentLoaded', () => {
    const changesPassword = document.querySelector('#changes_password');

    const changePasswordPage = new ChangePasswordPage();
    changesPassword!.append(changePasswordPage.getContent()!);

    changePasswordPage.dispatchComponentDidMount();
});