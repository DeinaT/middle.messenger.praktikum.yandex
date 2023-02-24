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
                }
            }
        });
        return input.setClassForEvent(this.getCodeWord(_codeWordEvent)) as Input;
    }

    public static getDefaultNotEmptyInput(_input__name: string, _input__placeholder: string, _codeWordEvent?: string): Input {
        const input = new Input({
            input__name: _input__name,
            input__placeholder: _input__placeholder,
            events: {
                blur: () => {
                    Validation.isEmptyInput(input as Input);
                }
            }
        });
        return input.setClassForEvent(this.getCodeWord(_codeWordEvent)) as Input;
    }

    public static getDefaultPasswordInput(_input__name: string, _input__placeholder: string, blurFun: () => void, _codeWordEvent?: string): Input {
        const input = new Input({
            input__name: _input__name,
            input__placeholder: _input__placeholder,
            input__is_password: true,
            events: {
                blur: blurFun
            }
        });
        return input.setClassForEvent(this.getCodeWord(_codeWordEvent)) as Input;
    }

    private static getCodeWord(_codeWordEvent?: string): string {
        return (_codeWordEvent === null || _codeWordEvent === undefined) ? "for_event" : _codeWordEvent;
    }
}
