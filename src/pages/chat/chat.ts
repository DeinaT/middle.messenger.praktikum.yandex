import template from './chat.hbs';
import '../../css/style.sass';
import '../../css/chat.sass';
import '../../css/menu.sass';
import Block from '../../utils/block';
import ArrayChats from '../../objects/arrayChats';
import Chat from '../../objects/chat';
import iconRocket from '../../../static/icon/icon_rocket.png';
import FindInput from '../../components/find/find';
import Label from '../../components/label/label';
import DialogMenu from '../../components/dialog_menu/dialogMenu';
import MessagePreview from '../../components/message_preview/messagePreview';
import Message from '../../objects/message';
import MessageList from '../../components/message_list/messageList';
import Navigation from '../../utils/navigation';

interface ChatProps {
    icon_rocket: object,
    dialog_setting: DialogMenu,
    all_preview?: Array<MessagePreview>
}

class ChatPage extends Block {
    constructor(props: ChatProps) {
        super('main', props);
        if (this.props.all_preview === undefined) {
            this.props.all_preview = [];
        }

        const linkSetting: Label = new Label({
            label__text: 'Настройки',
            events: {
                click: () => {
                    window.location.href = '../../' + Navigation.information;
                },
            },
        });
        (this.children.dialog_setting as DialogMenu).setCancelEvent(() => {
            window.location.href = '../../' + Navigation.authorization;
        });
        (this.children.dialog_setting as DialogMenu).addSettingLink(linkSetting);
        this.getContent()!.querySelector('.div__menu-user')!.addEventListener('click', () => {
            this.showSetting();
        });
    }

    private showSetting(): void {
        this.children.dialog_setting.changeVisible();
    }

    init() {
        this.children.find_input = new FindInput({
            type_name: 'find_user',
        });

        this.children.find_input.getContent()!.style.width = '70%';
        this.children.find_input.getContent()!.style.marginTop = '10px';

        this.children.find_input.setClassForEvent('for_event');
    }

    public addChat(chat: Chat): void {
        const lastMessage: Message = chat.getLastMessage()!;
        let countUnreadableMessage = 0;
        let showUnreadableMessage = false;
        if (!lastMessage.isRead) {
            countUnreadableMessage = chat.getCountUnreadableMessage();
            showUnreadableMessage = true;
        }
        const chatPreView = new MessagePreview({
            message_user: chat.getUser(),
            message_text: lastMessage.text,
            message_data: lastMessage.data,
            last_message_is_you: lastMessage.isYou,
            show_message_count: showUnreadableMessage,
            message_count: countUnreadableMessage,
            events: {
                click: () => {
                    this.selectChat(chat);
                    chatPreView.setSelect(true);
                },
            },
        });

        this.props.all_preview.push(chatPreView);
        this.getContent()!.querySelector('.left-menu__chats')!.append(chatPreView.getContent()!);
    }

    public selectChat(chat: Chat): void {
        this.props.all_preview.forEach((ch: { props: { message_select: boolean; }; }) => {
            ch.props.message_select = false;
        });
        const list: MessageList = new MessageList({
            chat_user: chat.getUser(),
            all_message: chat.getMessages(),
        });
        (this.getContent()!.querySelector('.start_chat')! as HTMLDivElement).style.display = 'none';
        this.removeAllChildNodes(this.getContent()!.querySelector('.list_message')!);
        this.getContent()!.querySelector('.list_message')!.append(list.getContent()!);
    }

    private removeAllChildNodes(parent: HTMLElement) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    render() {
        return this.compile(template, this.props);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#chat');

    const dialogSetting = new DialogMenu({
        exit_label: new Label({
            label__text: 'Выйти',
        })
    });
    const chatList = new ChatPage({
        icon_rocket: iconRocket,
        dialog_setting: dialogSetting,
    });
    ArrayChats.getArrayChats().forEach((value) => {
        chatList.addChat(value);
    });

    root!.append(chatList.getContent()!);
    root!.append(dialogSetting.getContent()!);

    chatList.dispatchComponentDidMount();
});
