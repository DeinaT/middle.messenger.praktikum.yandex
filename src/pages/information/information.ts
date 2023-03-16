import template from './information.hbs';
import '../../components/button/button.ts';
import '../../components/input/input.ts';
import '../../css/style.sass';
import '../../css/icon_avatar.sass';
import iconEmptyAvatar from '../../../static/icon/icon_empty_avatar.png';
import Block from '../../utils/block';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import DialogSelectFile from '../../components/dialog_select_file/dialogSelectFile';
import Router from '../../route/router';
import AuthController from "../../controllers/authController";
import {NavString} from "../../utils/navigation";
import User from "../../objects/user";


class InformationPage extends Block {
    constructor() {
        super('div', {iconEmptyAvatar: iconEmptyAvatar});

        const dialogSelectFile = new DialogSelectFile({title: "Загрузите файл"});

        const root = window.document.querySelector('body');
        root!.append(dialogSelectFile.getContent()!);

        this.setClassForEvent('for_event');
        this.props.events = {
            click: () => {
                dialogSelectFile.show();
            }
        };


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
        // Классы только для отображения!
        this.children.inputEmail = new Input({
            inputName: 'email',
            inputPlaceholder: 'Почта',
            inputReadOnly: true,
        });

        this.children.inputLogin = new Input({
            inputName: 'login',
            inputPlaceholder: 'Логин',
            inputReadOnly: true,
        });

        this.children.inputFirstName = new Input({
            inputName: 'first_name',
            inputPlaceholder: 'Имя',
            inputReadOnly: true,
        });

        this.children.inputSecondName = new Input({
            inputName: 'second_name',
            inputPlaceholder: 'Фамилия',
            inputReadOnly: true,
        });

        this.children.inputPhone = new Input({
            inputName: 'phone',
            inputPlaceholder: 'Телефон',
            inputReadOnly: true,
        });

        this.children.inputDisplayName = new Input({
            inputName: 'display_name',
            inputPlaceholder: 'Имя в чате',
            inputReadOnly: true,
        });

        this.children.button_change_data = new Button({
            buttonText: 'Изменть настройки',
            buttonState: 'neutral',
            events: {
                click: () => {
                    Router.go(NavString.CHANGE_DATA);
                },
            },
        });

        this.children.button_change_password = new Button({
            buttonText: 'Изменть пароль',
            buttonState: 'neutral',
            events: {
                click: () => {
                    Router.go(NavString.CHANGE_PASSWORD);
                },
            },
        });

        this.children.buttonBack = new Button({
            buttonText: 'Назад',
            buttonState: 'neutral',
            events: {
                click: () => {
                    Router.back();
                },
            },
        });
        this.children.buttonOut = new Button({
            buttonText: 'Выйти',
            buttonState: 'negative',
            events: {
                click: () => {
                    AuthController.logout();
                },
            },
        });

        this.children.button_change_data.getContent()!.style.width = '45%';
        this.children.button_change_password.getContent()!.style.width = '45%';
        this.children.buttonBack.getContent()!.style.width = '45%';
        this.children.buttonOut.getContent()!.style.width = '45%';
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

export default InformationPage;
