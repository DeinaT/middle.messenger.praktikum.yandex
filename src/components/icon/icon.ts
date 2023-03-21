import './icon.sass';
import Block from '../../utils/block';
import template from './icon.hbs';

interface IconProps {
    iconSrc: string;
    iconAlt: string;
    events?: {
        click?: () => void;
    };
}

export class Icon extends Block {
    constructor(props: IconProps) {
        super('img', props);
        (this.getContent()! as HTMLImageElement).alt = this.props.iconAlt;
        (this.getContent()! as HTMLImageElement).src = this.props.iconSrc;
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Icon;
