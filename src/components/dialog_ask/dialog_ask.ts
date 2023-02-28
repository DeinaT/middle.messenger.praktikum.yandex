import Block from '../../utils/Block';
import template from './dialog_ask.hbs';
import './dialog_ask.sass';
import {Button} from "../button/button";
import Input from "../input/input";


interface DialogAskProps {
}

export class DialogAsk extends Block {
    constructor(props: DialogAskProps) {
        super('div', props);
        super.addInnerClass("div__for_dialog__dialog_ask")
    }

    init() {
        //{{> input input__value="" type_name=login_user input__placeholder="Логин"}}
        this.children.input__info = new Input({
            input__name: "new_user",
            input__placeholder: "Пользователь",
        });

        this.children.button__add = new Button({
                        button__text: "Добавить",
                        button__state: "positive"
                    });

        this.children.button__add.getContent()!.style.marginTop="20px"
        this.children.button__add.getContent()!.style.width="80%"

        this.children.button__cancel = new Button({
                        button__text: "Отмена",
                        button__state: "neutral",
                        events: {
                            click: () => {
                                //window.location.href = item;
                                this.hide();
                            },
                        },
                    });

        this.children.button__cancel.getContent()!.style.marginTop="20px"
        this.children.button__cancel.getContent()!.style.width="80%"
        this.getContent()!.style.display="none"
    }

    render() {
        return this.compile(template, this.props);
    }
}
