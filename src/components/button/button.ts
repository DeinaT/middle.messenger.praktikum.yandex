import './button.sass'
import Block from '../../utils/Block';
import template from './button.hbs';

interface ButtonProps {
    button__text: string;
    button__state: string;
    button__type?: string;
    events?: {
        click: () => void;
    };
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super('button', props);
        if (this.props.button__type === undefined)
            this.props.button__type = "button";
        (this.getContent()! as HTMLButtonElement).type = this.props.button__type
    }

    public removeAllEvent(): void {
        delete this.props.events
    }

    render() {
        super.addInnerClass(this.props.button__state)
        return this.compile(template, this.props);
    }
}
