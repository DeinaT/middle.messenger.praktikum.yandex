import template from './information.hbs';
import '../../components/button/button.ts';
import '../../components/input/input.ts';
import '../../css/style.sass';
import '../../css/icon_avatar.sass';
import icon_empty_avatar from '../../../static/icon/icon_empty_avatar.png';
import Block from '../../utils/Block';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import Navigation from '../../utils/Navigation';

interface InformationProps {
    icon_empty_avatar: object;
}

class InformationPage extends Block {
    constructor(props: InformationProps) {
        super('main', props);
    }

    init() {
        // Классы только для отображения!
        this.children.input_email = new Input({
            input__name: 'email',
            input__placeholder: 'Почта',
        });

        this.children.input_login = new Input({
            input__name: 'login',
            input__placeholder: 'Логин',
        });

        this.children.input_first_name = new Input({
            input__name: 'first_name',
            input__placeholder: 'Имя',
        });

        this.children.input_second_name = new Input({
            input__name: 'second_name',
            input__placeholder: 'Фамилия',
        });

        this.children.input_phone = new Input({
            input__name: 'phone',
            input__placeholder: 'Телефон',
        });

        this.children.input_display_name = new Input({
            input__name: 'display_name',
            input__placeholder: 'Имя в чате',
        });

        this.children.button_change_data = new Button({
            button__text: 'Изменть настройки',
            button__state: 'neutral',
            events: {
                click: () => {
                    window.location.href = '../' + Navigation.changes_data;
                },
            },
        });

        this.children.button_change_password = new Button({
            button__text: 'Изменть пароль',
            button__state: 'neutral',
            events: {
                click: () => {
                    window.location.href = '../' + Navigation.changes_password;
                },
            },
        });

        this.children.button_back = new Button({
            button__text: 'Назад',
            button__state: 'neutral',
            events: {
                click: () => {
                    window.location.href = '../' + Navigation.chats;
                },
            },
        });
        this.children.button_out = new Button({
            button__text: 'Выйти',
            button__state: 'negative',
            events: {
                click: () => {
                    window.location.href = '../' + Navigation.authorization;
                },
            },
        });

        this.children.button_change_data.getContent()!.style.width = '45%';
        this.children.button_change_password.getContent()!.style.width = '45%';
        this.children.button_back.getContent()!.style.width = '45%';
        this.children.button_out.getContent()!.style.width = '45%';
    }

    render() {
        return this.compile(template, this.props);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const information = document.querySelector('#information');

    const informationPage = new InformationPage({
        icon_empty_avatar,
    });
    information!.append(informationPage.getContent()!);

    informationPage.dispatchComponentDidMount();
});
