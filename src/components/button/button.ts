import './button.sass';
import Block from '../../utils/block';
import template from './button.hbs';

interface ButtonProps {
    buttonText: string;
    buttonState: string;
    buttonType?: string;
    events?: {
        click: () => void;
    };
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super('button', props);
        if (this.props.buttonType === undefined) {
            this.props.buttonType = 'button';
        }
        (this.getContent()! as HTMLButtonElement).type = this.props.buttonType;
    }

    render() {
        super.addInnerClass(this.props.buttonState);
        return this.compile(template, this.props);
    }
}

export default Button;
