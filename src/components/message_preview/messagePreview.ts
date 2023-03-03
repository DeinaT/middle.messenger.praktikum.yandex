import './messagePreview.sass'
import Block from '../../utils/block';
import template from './messagePreview.hbs';

interface MessagePreviewProps {
    message_user: string;
    message_text: string;
    message_data: string;
    message_count?: number;
    message_select?: boolean;
    last_message_is_you?: boolean;
    show_message_count?: boolean;
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
        this.props.message_select = value;
    }

    render() {
        if (this.props.message_select === true) {
            super.addInnerClass('select');
        } else {
            super.removeInnerClass('select');
        }
        return this.compile(template, this.props);
    }
}

export default MessagePreview;
