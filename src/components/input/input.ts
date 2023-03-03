import './input.sass';
import Block from '../../utils/block';
import template from './input.hbs';

interface InputProps {
    input__name: string;
    input__value?: string;
    input__placeholder: string;
    input__error?: string;
    input__is_password?: boolean;
    input__display_error?: boolean;

    events?: {
        blur?: () => void;
        focus?: () => void;
    };
}

class Input extends Block {
    constructor(props: InputProps) {
        props.input__value = '';
        super('div', props);
        super.addInnerClass('input-group');
        this.getValue.bind(this.getValue);
    }

    public getValue(): string {
        this.props.input__value = this.getContent()!.querySelector('input')!.value;
        return this.props.input__value;
    }

    public setError(_message?: string): void {
        if (_message !== undefined) {
            this.props.input__error = _message;
        }
        this.props.input__display_error = true;
    }

    public clearError(): void {
        if (this.props.input__display_error) {
            this.props.input__display_error = false;
        }
    }

    public isValid(): boolean {
        return !this.props.input__display_error;
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Input;
