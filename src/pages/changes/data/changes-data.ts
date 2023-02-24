import template from './changes-data.hbs';
import '../../../css/style.sass'
import '../../../css/dialog.sass'
import Block from "../../../utils/Block";
import {Input} from "../../../components/input/input";
import {Button} from "../../../components/button/button";

class ChangeDataPage extends Block {
    constructor() {
        super('main', null);
    }

    init() {

        this.children.input_email = new Input({
            input__name: "email",
            input__placeholder: "Почта",
        });

        this.children.input_login = new Input({
            input__name: "login",
            input__placeholder: "Логин",
        });

        this.children.input_first_name = new Input({
            input__name: "first_name",
            input__placeholder: "Имя",
        });

        this.children.input_second_name = new Input({
            input__name: "second_name",
            input__placeholder: "Фамилия",
        });

        this.children.input_phone = new Input({
            input__name: "phone",
            input__placeholder: "Телефон",
        });

        this.children.input_display_name = new Input({
            input__name: "display_name",
            input__placeholder: "Имя в чате",
        });

        this.children.button_cancel = new Button({
            button__text: "Отмена",
            button__state: "neutral",
            events: {
                click: () => {
                    // todo validate
                },
            },
        });

        this.children.button_save = new Button({
            button__text: "Сохранить",
            button__state: "positive",
            events: {
                click: () => {
                    // todo validate
                },
            },
        });
        this.children.button_cancel.getContent()!.style.width = "45%"
        this.children.button_save.getContent()!.style.width = "45%"

        //button_select_file custom_style="width:80%;margin-top: 30px"  button__state="neutral" button__text="Изменить"
    }

    render() {
        return this.compile(template, this.props);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const changes_data = document.querySelector('#changes_data');

    const changeDataPage = new ChangeDataPage();
    changes_data!.append(changeDataPage.getContent()!);

    changeDataPage.dispatchComponentDidMount();
});
