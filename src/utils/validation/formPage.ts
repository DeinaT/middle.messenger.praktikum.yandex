import Input from '../../components/input/input';
import Block from '../block';

interface FormProps {
    checkInput?: Array<Input>,
    events?: {
        submit?: (event: FormDataEvent) => void;
    };
}

export abstract class FormPage extends Block {
    protected constructor(useFormData: (formData: FormData) => void) {
        const props: FormProps = {
            events: {
                submit: (evt) => {
                    evt.preventDefault();

                    let isValid = true;
                    for (let item of this.props.checkInput) {
                        isValid = isValid && item!.isValid();
                    }
                    if (isValid) {
                        useFormData.call(this, new FormData(this.getContent()!.querySelector('form')!));
                    }
                    return false;
                },
            },
        };
        super('div', props);
    }
}

export default FormPage;
