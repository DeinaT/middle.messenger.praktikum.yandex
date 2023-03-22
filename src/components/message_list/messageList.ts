import './messageList.sass';
import '../message_item/messageItem.sass';
import template from './messageList.hbs';
import iconSetting from '../../../static/icon/icon_setting.png';
import iconAddObject from '../../../static/icon/icon_add_object.png';
import iconSendMess from '../../../static/icon/icon_send_mess.png';
import MessageItem from '../message_item/messageItem';
import DialogMenu from '../dialog_menu/dialogMenu';
import Icon from '../icon/icon';
import BlockStore from '../../utils/blockStore';
import Message from '../../model/message';
import MessagesController from '../../controllers/messagesController';
import ChatInfo from '../../model/chatInfo';
import store from '../../model/store';

interface MessageListProps {
    chatUser?: string;
    iconSetting?: Icon;
    iconAddObject?: Icon;
    iconSendMess?: Icon;
    dialogControl: DialogMenu;
}

export class MessageList extends BlockStore {
    constructor(props: MessageListProps) {
        props.iconSetting = new Icon({
            iconSrc: iconSetting,
            iconAlt: 'Иконка настроек',
            events: {
                click: () => {
                    if (this.children.dialogControl !== null) {
                        this.children.dialogControl.changeVisible();
                    }
                },
            },
        });
        props.iconAddObject = new Icon({
            iconSrc: iconAddObject,
            iconAlt: 'Иконка добавления объекта',
            events: {
                click: () => {
                    // todo
                },
            },
        });

        props.iconSendMess = new Icon({
            iconSrc: iconSendMess,
            iconAlt: 'Иконка отправления сообщения',
            events: {
                click: () => {
                    MessagesController.sendMessage(this.props.selectedChat!, this.getNewMessage());
                },
            },
        });

        super('div', props, store => {
            this.removeAllChildNodes(this.getContent()!.querySelector('.all_message')!);
            if (store.selectedChat && store.messages) {
                this.props.selectedChat = store.selectedChat;
                const selectChat = store.chats.filter((chat: ChatInfo) => chat.id === store.selectedChat);
                if (selectChat!.length > 0)
                    this.props.chatUser = selectChat[0]!.title;
                this.initListMessage((store.messages || {})[store.selectedChat] || [],);
            }
        });
    }

    private initListMessage(messages: Message[]): void {
        messages.forEach((m: Message) => {
            let dateMessage: Date = new Date(m.time);
            let strDate: string = (dateMessage !== null) ? `${dateMessage.getHours()}:${dateMessage.getMinutes()}` : "";
            const message: MessageItem = new MessageItem({
                messageData: strDate,
                messageText: m.content,
                messageIsYou: m.user_id === store.getState().user.id,
            });

            this.getContent()!.style.height = 'inherit';
            if (this.getContent()!.querySelector('.all_message') !== null) {
                this.getContent()!.querySelector('.all_message')!.append(message.getContent()!);
            }
        });
    }

    private removeAllChildNodes(parent: HTMLElement) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    public getNewMessage(): string {
        return (this.getContent()!.querySelector('.input__for-chat')! as HTMLInputElement).value;
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default MessageList;
