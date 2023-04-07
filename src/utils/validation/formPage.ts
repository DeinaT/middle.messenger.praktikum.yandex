import Input from '../../components/input/input';
import BlockStore from '../blockStore';

interface FormProps {
    checkInput?: Array<Input>,
    events?: {
        submit?: (event: FormDataEvent) => void;
    };
}

export abstract class FormPage extends BlockStore {
    protected constructor(
        useFormData: (formData: FormData) => void,
        mapStateToProps?: (state: any) => any,
    ) {
        const props: FormProps = {
            events: {
                submit: (evt) => {
                    evt.preventDefault();

                    let isValid = true;
                    this.props.checkInput.forEach((item: Input) => {
                        isValid = isValid && item!.isValid();
                    });
                    if (isValid) {
                        useFormData.call(this, new FormData(this.getContent()!.querySelector('form')!));
                    }
                    return false;
                },
            },
        };
        super('div', props, mapStateToProps);
    }
}

export default FormPage;
