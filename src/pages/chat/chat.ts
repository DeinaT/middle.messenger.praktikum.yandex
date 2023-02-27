import template from './chat.hbs';
import '../../css/style.sass'
import '../../css/chat.sass'
import '../../css/menu.sass'
import Block from "../../utils/Block";
import {ArrayChats} from "../../objects/ArrayChats";
import {Chat} from "../../objects/Chat";
import icon_rocket from '../../../static/icon/icon_rocket.png'
import {FindInput} from "../../components/find/find";
import {MessagePreview} from "../../components/message_preview/message_preview";
import {Message} from "../../objects/Message";

interface ChatProps {
    icon_rocket: any
}

class ChatPage extends Block {

    constructor(props: ChatProps) {
        super('main', props);
    }

    init() {
        this.children.find_input = new FindInput({type_name: "find_user"});

        this.children.find_input.getContent()!.style.width = "70%";
        this.children.find_input.getContent()!.style.marginTop = "10px";
    }

    public addChat(chat: Chat): void {
        let lastMessage: Message = chat.getLastMessage()!;
        let countUnreadableMessage: number = 0;
        let showUnreadableMessage: boolean = false;
        if (!lastMessage.isRead) {
            countUnreadableMessage = chat.getCountUnreadableMessage();
            showUnreadableMessage = true;
        }
        let chatPreView = new MessagePreview({
            message_user: chat.getUser(),
            message_text: lastMessage.text,
            message_data: lastMessage.data,
            last_message_is_you: lastMessage.isYou,
            show_message_count: showUnreadableMessage,
            message_count: countUnreadableMessage,
        });
        this.getContent()!.querySelector(".left-menu__chats")!.append(chatPreView.getContent()!);
    }

    render() {
        return this.compile(template, this.props);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#chat');

    const chatList = new ChatPage({
        icon_rocket: icon_rocket
    });
    ArrayChats.getArrayChats().forEach(value => {
        chatList.addChat(value);
    });

    root!.append(chatList.getContent()!);

    chatList.dispatchComponentDidMount();
});
