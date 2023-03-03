import './find.sass';
import Block from '../../utils/block';
import template from './find.hbs';

interface FindInputProps {
    typeName: string;
    inputValue?: string;
}

export class FindInput extends Block {
    constructor(props: FindInputProps) {
        super('div', props);
        super.addInnerClass('find-group');
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default FindInput;
