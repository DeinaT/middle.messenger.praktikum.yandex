import './input.sass'
import Block from '../../utils/Block';
import template from './input.hbs';

interface InputProps {
    input__name: string;
    input__value?: string;
    input__placeholder: string;
    input__error?: string;
    input__is_password?: boolean;
    input__display_error?: boolean;
}

export class Input extends Block {
    constructor(props: InputProps) {
        super('div', props);
        super.addInnerClass("input-group");
    }

    render() {
        return this.compile(template, this.props);
    }
}
