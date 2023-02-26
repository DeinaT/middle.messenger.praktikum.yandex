import template from './changes-data.hbs';
import '../../../css/style.sass'
import '../../../css/dialog.sass'
import Block from "../../../utils/Block";
import {Button} from "../../../components/button/button";
import {ConstructionDefault} from "../../../utils/validation/ConstructionDefault";

class ChangeDataPage extends Block {
    constructor() {
        super('main', null);
    }

    init() {
        this.children.input_email = ConstructionDefault.getDefaultEmailInput();
        this.children.input_login = ConstructionDefault.getDefaultNotEmptyInput("login", "Логин");
        this.children.input_first_name = ConstructionDefault.getDefaultNotEmptyInput("first_name", "Имя");
        this.children.input_second_name = ConstructionDefault.getDefaultNotEmptyInput("second_name", "Фамилия");
        this.children.input_phone = ConstructionDefault.getDefaultNotEmptyInput("phone", "Телефон");
        this.children.input_display_name = ConstructionDefault.getDefaultNotEmptyInput("display_name", "Имя в чате");

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
            button__type: "submit",
            events: {
                click: () => {
                    // todo validate
                },
            },
        });
        this.children.button_cancel.getContent()!.style.width = "45%"
        this.children.button_save.getContent()!.style.width = "45%"
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
