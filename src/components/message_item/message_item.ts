import './message_item.sass'
import Block from '../../utils/Block';
import template from './message_item.hbs';

interface MessageItemProps {
    message_text: string;
    message_data: string;
    message_is_you?: boolean;
}

export class MessageItem extends Block {
    constructor(props: MessageItemProps) {
        super('div', props);
        super.addInnerClass("p__message_text");
        if (this.props.message_is_you === true)
            super.addInnerClass("is-you");
    }

    render() {
        return this.compile(template, this.props);
    }
}
