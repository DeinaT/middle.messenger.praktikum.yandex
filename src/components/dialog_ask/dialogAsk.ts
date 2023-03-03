import Block from '../../utils/block';
import template from './dialogAsk.hbs';
import './dialogAsk.sass';
import Button from '../button/button';
import Input from '../input/input';

interface DialogAskProps {
    title: string;
    input_placeholder: string;
    button_add_text: string;
    button_add_type: string;
    button_cancel_text: string;
    button_add_function: (input_value: string) => void;
}

export class DialogAsk extends Block {
    constructor(props: DialogAskProps) {
        super('div', props);
        super.addInnerClass('div__for_dialog__dialog_ask');
    }

    init() {
        this.children.input__info = new Input({
            input__name: 'input_value',
            input__placeholder: this.props.input_placeholder,
        });

        this.children.button__add = new Button({
            button__text: this.props.button_add_text,
            button__state: this.props.button_add_type,
            events: {
                click: () => {
                    this.props.button_add_function((this.children.input__info as Input).getValue());
                },
            },
        });

        this.children.button__add.getContent()!.style.marginTop = '20px';
        this.children.button__add.getContent()!.style.width = '80%';

        this.children.button__cancel = new Button({
            button__text: this.props.button_cancel_text,
            button__state: 'neutral',
            events: {
                click: () => {
                    this.hide();
                },
            },
        });

        this.children.button__cancel.getContent()!.style.marginTop = '20px';
        this.children.button__cancel.getContent()!.style.width = '80%';
        this.getContent()!.style.display = 'none';
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default DialogAsk;
