import Input from '../../components/input/input';

export class Validation {
    public static isTelephone(_input: Input): void {
        const sampleRegEx: RegExp = /\+7\([0-9]{3}\)[0-9]{2}[0-9]{2}[0-9]{3}/;
        const res: boolean = sampleRegEx.test(_input.getValue());
        if (res) {
            _input.clearError();
        } else {
            _input.setError();
        }
    }

    public static isEmail(_input: Input): void {
        const sampleRegEx: RegExp = /.+@.+\.\w+/;
        const res: boolean = sampleRegEx.test(_input.getValue());
        if (res) {
            _input.clearError();
        } else {
            _input.setError();
        }
    }

    public static isEmptyInput(_input: Input): boolean {
        const isEmpty: boolean = this.isEmptyInputWithoutRender(_input);
        if (!isEmpty) {
            _input.clearError();
        } else {
            _input.setError('Поле не может быть пустым');
        }
        return isEmpty;
    }

    public static isEmptyInputWithoutRender(_input: Input): boolean {
        return _input.getValue() === '' || _input.getValue() === undefined || _input.getValue() === null;
    }

    public static checkFirstPassword(_input: Input, _inputRepeat: Input): void {
        const isEmptyFirst = this.isEmptyInput(_input);
        const isEmptyRepeat = this.isEmptyInputWithoutRender(_inputRepeat);
        if (!isEmptyFirst && !isEmptyRepeat) {
            if (_input.getValue() === _inputRepeat.getValue()) {
                _input.clearError();
                _inputRepeat.clearError();
            } else {
                _inputRepeat.setError('Пароли не совпадат');
            }
        }
    }

    public static checkTwoPassword(_input: Input, _inputRepeat: Input): void {
        const isEmpty = this.isEmptyInput(_input) || this.isEmptyInput(_inputRepeat);
        if (!isEmpty) {
            if (_input.getValue() === _inputRepeat.getValue()) {
                _input.clearError();
                _inputRepeat.clearError();
            } else {
                _inputRepeat.setError('Пароли не совпадат');
            }
        }
    }
}

export default Validation;
