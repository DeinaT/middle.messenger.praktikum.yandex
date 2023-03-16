import './input.sass';
import Block from '../../utils/block';
import template from './input.hbs';

interface InputProps {
    inputName: string;
    inputValue?: string;
    inputPlaceholder: string;
    inputError?: string;
    inputIsPassword?: boolean;
    inputDisplayError?: boolean;
    inputReadOnly?: boolean;

    events?: {
        blur?: () => void;
        focus?: () => void;
    };
}

class Input extends Block {
    constructor(props: InputProps) {
        props.inputValue = '';
        super('div', props);
        super.addInnerClass('input-group');
        this.getValue.bind(this.getValue);

        (this.getContent()! as HTMLInputElement).readOnly = this.props.inputReadOnly;
    }

    public getValue(): string {
        this.props.inputValue = this.getContent()!.querySelector('input')!.value;
        return this.props.inputValue;
    }

    public setValue(value: string): void {
        this.props.inputValue = value;
    }

    public setError(_message?: string): void {
        if (_message !== undefined) {
            this.props.inputError = _message;
        }
        this.props.inputDisplayError = true;
    }

    public clearError(): void {
        if (this.props.inputDisplayError) {
            this.props.inputDisplayError = false;
        }
    }

    public isValid(): boolean {
        return !this.props.inputDisplayError;
    }

    render(): DocumentFragment {
        return this.compile(template, this.props);
    }
}

export default Input;
