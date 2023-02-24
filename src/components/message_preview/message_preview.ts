import './message_preview.sass'
import Block from '../../utils/Block';
import template from './message_preview.hbs';

interface MessagePreviewProps {
    message_user: string;
    message_text: string;
    message_data: string;
    message_count: string;
    message_select?: boolean;
    last_message_is_you?: boolean;
    show_message_count: boolean;
}

export class MessagePreview extends Block {
    constructor(props: MessagePreviewProps) {
        super('div', props);
        super.addInnerClass("message_preview__main");
        if (this.props.message_select === true)
            super.addInnerClass("select");
    }

    render() {
        return this.compile(template, this.props);
    }
}
