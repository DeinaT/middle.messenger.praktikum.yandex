import Input from '../../components/input/input';
import Validation from './validation';

export class ConstructionDefault {
    public static getDefaultEmailInput(_codeWordEvent?: string): Input {
        const input = new Input({
            input__name: 'email',
            input__placeholder: 'Почта',
            input__error: 'Некорректный адрес',
            events: {
                blur: () => {
                    Validation.isEmail(input as Input);
                },
                focus: () => {
                    this.returnFocus(input);
                },
            },
        });
        return input.setClassForEvent(this.getCodeWord(_codeWordEvent)) as Input;
    }

    public static getDefaultTelephoneInput(_codeWordEvent?: string): Input {
        const input = new Input({
            input__name: 'phone',
            input__placeholder: 'Телефон',
            input__error: 'Введите телефон в формате +7(XXX)XXXXXXX',
            events: {
                blur: () => {
                    Validation.isTelephone(input as Input);
                },
                focus: () => {
                    this.returnFocus(input);
                },
            },
        });
        return input.setClassForEvent(this.getCodeWord(_codeWordEvent)) as Input;
    }

    public static getDefaultNotEmptyInput(_inputName: string, _inputPlaceholder: string, _codeWordEvent?: string): Input {
        const input = new Input({
            input__name: _inputName,
            input__placeholder: _inputPlaceholder,
            events: {
                blur: () => {
                    Validation.isEmptyInput(input as Input);
                },
                focus: () => {
                    this.returnFocus(input);
                },
            },
        });
        return input.setClassForEvent(this.getCodeWord(_codeWordEvent)) as Input;
    }

    public static getDefaultPasswordInput(_inputName: string, _inputPlaceholder: string, blurFun: () => void, _codeWordEvent?: string): Input {
        const input = new Input({
            input__name: _inputName,
            input__placeholder: _inputPlaceholder,
            input__is_password: true,
            events: {
                blur: blurFun,
                focus: () => {
                    this.returnFocus(input);
                },
            },
        });
        return input.setClassForEvent(this.getCodeWord(_codeWordEvent)) as Input;
    }

    private static getCodeWord(_codeWordEvent?: string): string {
        return (_codeWordEvent === null || _codeWordEvent === undefined) ? 'for_event' : _codeWordEvent;
    }

    private static returnFocus(_input: Input): void {
        _input.clearError();
        const htmlInputElement = _input.getEventComponent() as HTMLInputElement;
        htmlInputElement.selectionStart = htmlInputElement.value.length;
        htmlInputElement.focus();
    }
}

export default ConstructionDefault;
