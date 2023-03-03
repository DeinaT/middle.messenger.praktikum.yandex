import './messagePreview.sass'
import Block from '../../utils/block';
import template from './messagePreview.hbs';

interface MessagePreviewProps {
    messageUser: string;
    messageText: string;
    messageData: string;
    messageCount?: number;
    messageSelect?: boolean;
    lastMessageIsYou?: boolean;
    showMessageCount?: boolean;
    events?: {
        click: () => void;
    };
}

export class MessagePreview extends Block {
    constructor(props: MessagePreviewProps) {
        super('div', props);
        super.addInnerClass('message_preview__main');
    }

    public setSelect(value: boolean): void {
        this.props.messageSelect = value;
    }

    render() {
        if (this.props.messageSelect === true) {
            super.addInnerClass('select');
        } else {
            super.removeInnerClass('select');
        }
        return this.compile(template, this.props);
    }
}

export default MessagePreview;
