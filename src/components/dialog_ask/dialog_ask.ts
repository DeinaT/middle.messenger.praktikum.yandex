import Block from '../../utils/Block';
import template from './dialog_ask.hbs';
import './dialog_ask.sass';
import {Button} from "../button/button";
import Input from "../input/input";


interface DialogAskProps {
    title: string;
}

export class DialogAsk extends Block {
    constructor(props: DialogAskProps) {
        super('div', props);
        super.addInnerClass("div__for_dialog__dialog_ask")
    }

    init() {
        this.children.input__info = new Input({
            input__name: "new_user",
            input__placeholder: "Пользователь",
        });

        this.children.button__add = new Button({
            button__text: "Добавить",
            button__state: "positive",
            events: {
                click: () => {
                }
            }
        });

        this.children.button__add.getContent()!.style.marginTop = "20px"
        this.children.button__add.getContent()!.style.width = "80%"

        this.children.button__cancel = new Button({
            button__text: "Отмена",
            button__state: "neutral",
            events: {
                click: () => {
                    this.hide();
                },
            },
        });

        this.children.button__cancel.getContent()!.style.marginTop = "20px"
        this.children.button__cancel.getContent()!.style.width = "80%"
        this.getContent()!.style.display = "none"
    }

    public setFunctionButton(_function: () => void) {
        let newProps = {
            events: {
                click: _function
            }
        };
        (this.children.button__add as Button).removeAllEvent();
        this.children.button__add.setProps(newProps);
    }

    public setTypeButton(_nameButton: string, _typeButton: string) {
        this.props.title = _nameButton;
        let newProps = {
            button__text: _nameButton,
            button__state: _typeButton,
        };
        this.children.button__add.removeAllInnerClass();
        this.children.button__add.setProps(newProps);
    }


    render() {
        return this.compile(template, this.props);
    }
}
