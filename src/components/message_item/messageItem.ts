import './messageItem.sass';
import Block from '../../utils/block';
import template from './messageItem.hbs';

interface MessageItemProps {
    message_text: string;
    message_data: string;
    message_is_you?: boolean;
}

export class MessageItem extends Block {
    constructor(props: MessageItemProps) {
        super('div', props);
        super.addInnerClass('p__message_text');
        if (this.props.message_is_you === true) {
            super.addInnerClass('is-you');
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default MessageItem;
