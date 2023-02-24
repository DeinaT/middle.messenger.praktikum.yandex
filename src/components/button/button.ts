import './button.sass'
import Block from '../../utils/Block';
import template from './button.hbs';

interface ButtonProps {
    button__text: string;
    button__state: string;
    events: {
        click: () => void;
    };
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super('button', props);
        super.addInnerClass(this.props.button__state)
    }

    render() {
        return this.compile(template, this.props);
    }
}
