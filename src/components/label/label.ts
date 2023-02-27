import './label.sass'
import Block from '../../utils/Block';
import template from './label.hbs';

interface LabelProps {
    label__text: string;
    events?: {
        click: () => void;
    };
}

export class Label extends Block {
    constructor(props: LabelProps) {
        super('label', props);
        super.addInnerClass("generate")
    }

    render() {
        return this.compile(template, this.props);
    }
}