import Block from '../../utils/block';
import template from './dialogAsk.hbs';
import './dialogAsk.sass';
import Button from '../button/button';
import Input from '../input/input';

interface DialogAskProps {
    title: string;
    inputPlaceholder: string;
    buttonAddText: string;
    buttonAddType: string;
    buttonCancelText: string;
    buttonAddFunction: (input_value: string) => void;
}

export class DialogAsk extends Block {
    constructor(props: DialogAskProps) {
        super('div', props);
        super.addInnerClass('div__for_dialog__dialog_ask');
    }

    init() {
        this.children.inputInfo = new Input({
            inputName: 'input_value',
            inputPlaceholder: this.props.inputPlaceholder,
        });

        this.children.buttonAdd = new Button({
            buttonText: this.props.buttonAddText,
            buttonState: this.props.buttonAddType,
            events: {
                click: () => {
                    this.props.buttonAddFunction((this.children.input__info as Input).getValue());
                },
            },
        });

        this.children.buttonAdd.getContent()!.style.marginTop = '20px';
        this.children.buttonAdd.getContent()!.style.width = '80%';

        this.children.buttonCancel = new Button({
            buttonText: this.props.buttonCancelText,
            buttonState: 'neutral',
            events: {
                click: () => {
                    this.hide();
                },
            },
        });

        this.children.buttonCancel.getContent()!.style.marginTop = '20px';
        this.children.buttonCancel.getContent()!.style.width = '80%';
        this.getContent()!.style.display = 'none';
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default DialogAsk;
