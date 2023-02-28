import './message_list.sass'
import '../message_item/message_item.sass'
import Block from '../../utils/Block';
import template from './message_list.hbs';
import icon_setting from '../../../static/icon/icon_setting.png'
import icon_add_object from '../../../static/icon/icon_add_object.png'
import icon_send_mess from '../../../static/icon/icon_send_mess.png'
import {Message} from "../../objects/Message";
import {MessageItem} from "../message_item/message_item";

interface MessageListProps {
    chat_user: string;
    all_message: Array<Message>;
    icon_setting?: object;
    icon_add_object?: object;
    icon_send_mess?: object;
}

export class MessageList extends Block {
    constructor(props: MessageListProps) {
        props.icon_send_mess = icon_send_mess;
        props.icon_setting = icon_setting;
        props.icon_add_object = icon_add_object;
        super('div', props);
        this.initListMessage()
    }

    private initListMessage(): void {
        this.props.all_message.forEach((m: { data: string; text: string; isYou: boolean; }) => {
            let message: MessageItem = new MessageItem({
                message_data: m.data,
                message_text: m.text,
                message_is_you: m.isYou,
            });

            this.getContent()!.style.height = "inherit";
            if (this.getContent()!.querySelector(".all_message") !== null)
                this.getContent()!.querySelector(".all_message")!.append(message.getContent()!);
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
