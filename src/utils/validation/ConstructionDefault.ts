import Input from "../../components/input/input";
import {Validation} from "./Validation";

export class ConstructionDefault {

    public static getDefaultEmailInput(_codeWordEvent?: string): Input {
        const input = new Input({
            input__name: "email",
            input__placeholder: "Почта",
            input__error: "Некорректный адрес",
            events: {
                blur: () => {
                    Validation.isEmail(input as Input);
                },
                focus: () => {
                    this._returnFocus(input)
                }
            }
        });
        return input.setClassForEvent(this._getCodeWord(_codeWordEvent)) as Input;
    }

    public static getDefaultTelephoneInput(_codeWordEvent?: string): Input {
        const input = new Input({
            input__name: "phone",
            input__placeholder: "Телефон",
            input__error: "Введите телефон в формате +7(XXX)XXXXXXX",
            events: {
                blur: () => {
                    Validation.isTelephone(input as Input);
                },
                focus: () => {
                    this._returnFocus(input)
                }
            }
        });
        return input.setClassForEvent(this._getCodeWord(_codeWordEvent)) as Input;
    }

    public static getDefaultNotEmptyInput(_input__name: string, _input__placeholder: string, _codeWordEvent?: string): Input {
        const input = new Input({
            input__name: _input__name,
            input__placeholder: _input__placeholder,
            events: {
                blur: () => {
                    Validation.isEmptyInput(input as Input);
                },
                focus: () => {
                    this._returnFocus(input)
                }
            }
        });
        return input.setClassForEvent(this._getCodeWord(_codeWordEvent)) as Input;
    }

    public static getDefaultPasswordInput(_input__name: string, _input__placeholder: string, blurFun: () => void, _codeWordEvent?: string): Input {
        const input = new Input({
            input__name: _input__name,
            input__placeholder: _input__placeholder,
            input__is_password: true,
            events: {
                blur: blurFun,
                focus: () => {
                    this._returnFocus(input)
                }
            }
        });
        return input.setClassForEvent(this._getCodeWord(_codeWordEvent)) as Input;
    }

    private static _getCodeWord(_codeWordEvent?: string): string {
        return (_codeWordEvent === null || _codeWordEvent === undefined) ? "for_event" : _codeWordEvent;
    }

    private static _returnFocus(_input: Input): void {
        _input.clearError();
        let htmlInputElement = _input.getEventComponent() as HTMLInputElement;
        htmlInputElement.selectionStart = htmlInputElement.value.length;
        htmlInputElement.focus();
    }
}
