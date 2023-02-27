import './find.sass'
import Block from '../../utils/Block';
import template from './find.hbs';

interface FindInputProps {
    type_name: string;
    input__value?: string;
}

export class FindInput extends Block {
    constructor(props: FindInputProps) {
        super('div', props);
        super.addInnerClass("find-group");
    }

    render() {
        return this.compile(template, this.props);
    }
}
