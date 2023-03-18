import template from './data.hbs';
import '../../../css/style.sass';
import Button from '../../../components/button/button';
import ConstructionDefault from '../../../utils/validation/constructionDefault';
import FormPage from '../../../utils/validation/formPage';
import UserData from '../../../model/userData';
import Router from "../../../route/router";
import UserController from "../../../controllers/userController";
import AuthController from "../../../controllers/authController";
import Input from "../../../components/input/input";
import User from "../../../objects/user";

class ChangeDataPage extends FormPage {
    constructor() {
        super(formData => {
            UserController.changeProfile(new UserData(formData))
        });


        try {
            AuthController.fetchUser().then(user => {
                if (user.id !== 0) {
                    this.fillInfo(user);
                }
            });
        } catch (e: any) {
        }
    }

    init() {
        this.children.inputEmail = ConstructionDefault.getDefaultEmailInput();
        this.children.inputLogin = ConstructionDefault.getDefaultNotEmptyInput('login', 'Логин');
        this.children.inputFirstName = ConstructionDefault.getDefaultNotEmptyInput('first_name', 'Имя');
        this.children.inputSecondName = ConstructionDefault.getDefaultNotEmptyInput('second_name', 'Фамилия');
        this.children.inputPhone = ConstructionDefault.getDefaultTelephoneInput();
        this.children.inputDisplayName = ConstructionDefault.getDefaultNotEmptyInput('display_name', 'Имя в чате');

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
            this.children.inputEmail,
            this.children.inputLogin,
            this.children.inputFirstName,
            this.children.inputSecondName,
            this.children.inputPhone,
            this.children.inputDisplayName,
        ];
    }

    fillInfo(info: User) {
        (this.children.inputEmail as Input).setValue(info.email);
        (this.children.inputLogin as Input).setValue(info.login);
        (this.children.inputFirstName as Input).setValue(info.first_name);
        (this.children.inputSecondName as Input).setValue(info.second_name);
        (this.children.inputDisplayName as Input).setValue(info.display_name);
        (this.children.inputPhone  as Input).setValue(info.phone);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ChangeDataPage;
