import template from './registration.hbs';
import '../../components/button/button.ts'
import '../../components/input/input.ts'
import '../../css/style.sass'
import Block from "../../utils/Block";
import Input from "../../components/input/input";
import {Button} from "../../components/button/button";
import {Validation} from "../../utils/validation/Validation";
import {UserRegistration} from "../../objects/UserRegistration";
import {ConstructionDefault} from "../../utils/validation/ConstructionDefault";


interface FormProps {
    checkInput?: Array<Input>,
    events?: {
        submit?: (event: FormDataEvent) => void;
    };
}

class RegistrationPage extends Block {

    constructor() {
        let props: FormProps = {
            events: {
                submit: (evt) => {
                    evt.preventDefault()

                    let isValid: boolean = true;
                    for (let item of this.props.checkInput) {
                        isValid = isValid && item.isValid();
                    }
                    if (isValid) {
                        const formData = new FormData(this.getContent()!.querySelector("form")!)
                        let data: object = new UserRegistration(
                            formData.get("email") as string,
                            formData.get("login") as string,
                            formData.get("first_name") as string,
                            formData.get("second_name") as string,
                            formData.get("phone") as string,
                            formData.get("password") as string
                        )
                        console.log(data);
                    }
                    return false;
                }
            }
        }
        super('main', props);
    }

    init() {
        this.children.input_email = ConstructionDefault.getDefaultEmailInput();

        this.children.input_login = ConstructionDefault.getDefaultNotEmptyInput("login", "Логин");
        this.children.input_first_name = ConstructionDefault.getDefaultNotEmptyInput("first_name", "Имя");
        this.children.input_second_name = ConstructionDefault.getDefaultNotEmptyInput("second_name", "Фамилия");
        this.children.input_phone = ConstructionDefault.getDefaultNotEmptyInput("phone", "Телефон");

        this.children.input_password = ConstructionDefault.getDefaultPasswordInput(
            "password",
            "Пароль",
            () => Validation.checkFirstPassword(this.children.input_password as Input,
                this.children.input_password_repeat as Input)
        );

        this.children.input_password_repeat = ConstructionDefault.getDefaultPasswordInput(
            "password_repeat",
            "Пароль (еще раз)",
            () => Validation.checkTwoPassword(this.children.input_password as Input,
                this.children.input_password_repeat as Input)
        );

        this.children.button = new Button({
            button__text: "Зарегистрироваться",
            button__state: "neutral",
            button__type: "submit"
        });

        this.setClassForEvent("for_event")

        this.props.checkInput = [
            this.children.input_email,
            this.children.input_login,
            this.children.input_first_name,
            this.children.input_second_name,
            this.children.input_phone,
            this.children.input_password,
            this.children.input_password_repeat
        ];
    }

    render() {
        return this.compile(template, this.props);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const registration = document.querySelector('#registration');

    const registrationPage = new RegistrationPage();
    registration!.append(registrationPage.getContent()!);

    registrationPage.dispatchComponentDidMount();
});
