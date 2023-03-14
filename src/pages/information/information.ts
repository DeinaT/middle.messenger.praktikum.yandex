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
import Navigation from '../../utils/navigation';


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
    }

    init() {
        // Классы только для отображения!
        this.children.inputEmail = new Input({
            inputName: 'email',
            inputPlaceholder: 'Почта',
        });

        this.children.inputLogin = new Input({
            inputName: 'login',
            inputPlaceholder: 'Логин',
        });

        this.children.inputFirstName = new Input({
            inputName: 'first_name',
            inputPlaceholder: 'Имя',
        });

        this.children.inputSecondName = new Input({
            inputName: 'second_name',
            inputPlaceholder: 'Фамилия',
        });

        this.children.inputPhone = new Input({
            inputName: 'phone',
            inputPlaceholder: 'Телефон',
        });

        this.children.inputDisplayName = new Input({
            inputName: 'display_name',
            inputPlaceholder: 'Имя в чате',
        });

        this.children.button_change_data = new Button({
            buttonText: 'Изменть настройки',
            buttonState: 'neutral',
            events: {
                click: () => {
                    window.location.href = '../../' + Navigation.changes_data;
                },
            },
        });

        this.children.button_change_password = new Button({
            buttonText: 'Изменть пароль',
            buttonState: 'neutral',
            events: {
                click: () => {
                    window.location.href = '../../' + Navigation.changes_password;
                },
            },
        });

        this.children.buttonBack = new Button({
            buttonText: 'Назад',
            buttonState: 'neutral',
            events: {
                click: () => {
                    window.location.href = '../../' + Navigation.chats;
                },
            },
        });
        this.children.buttonOut = new Button({
            buttonText: 'Выйти',
            buttonState: 'negative',
            events: {
                click: () => {
                    window.location.href = '../../' + Navigation.authorization;
                },
            },
        });

        this.children.button_change_data.getContent()!.style.width = '45%';
        this.children.button_change_password.getContent()!.style.width = '45%';
        this.children.buttonBack.getContent()!.style.width = '45%';
        this.children.buttonOut.getContent()!.style.width = '45%';
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default InformationPage;
