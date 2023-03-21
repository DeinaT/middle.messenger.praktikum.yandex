import './messageItem.sass';
import Block from '../../utils/block';
import template from './messageItem.hbs';

interface MessageItemProps {
    messageText: string;
    messageData: string;
    messageIsYou?: boolean;
}

export class MessageItem extends Block {
    constructor(props: MessageItemProps) {
        super('div', props);
        super.addInnerClass('p__message_text');
        if (this.props.messageIsYou === true) {
            super.addInnerClass('is-you');
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default MessageItem;
