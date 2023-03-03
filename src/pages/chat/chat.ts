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
import DialogAsk from '../../components/dialog_ask/dialogAsk';
import MessagePreview from '../../components/message_preview/messagePreview';
import Message from '../../objects/message';
import MessageList from '../../components/message_list/messageList';
import Navigation from '../../utils/navigation';

interface ChatProps {
    iconRocket: object,
    dialogSetting: DialogMenu,
    dialogControlUser: DialogMenu,
    allPreview?: Array<MessagePreview>
}

class ChatPage extends Block {
    constructor(props: ChatProps) {
        super('main', props);
        if (this.props.allPreview === undefined) {
            this.props.allPreview = [];
        }

        const linkSetting: Label = new Label({
            labelText: 'Настройки',
            events: {
                click: () => {
                    window.location.href = '../../' + Navigation.information;
                },
            },
        });
        (this.children.dialogSetting as DialogMenu).setCancelEvent(() => {
            window.location.href = '../../' + Navigation.authorization;
        });
        (this.children.dialogSetting as DialogMenu).addSettingLink(linkSetting);

        this.setClassForEvent('for_event');
        this.props.events = {
            click: () => {
                this.showSetting();
            }
        };
    }

    private showSetting(): void {
        this.children.dialogSetting.changeVisible();
    }

    init() {
        this.children.findInput = new FindInput({
            typeName: 'find_user',
        });

        this.children.findInput.getContent()!.style.width = '70%';
        this.children.findInput.getContent()!.style.marginTop = '10px';

        this.children.findInput.setClassForEvent('for_event');
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
            messageUser: chat.getUser(),
            messageText: lastMessage.text,
            messageData: lastMessage.data,
            lastMessageIsYou: lastMessage.isYou,
            showMessageCount: showUnreadableMessage,
            messageCount: countUnreadableMessage,
            events: {
                click: () => {
                    this.selectChat(chat);
                    chatPreView.setSelect(true);
                },
            },
        });

        this.props.allPreview.push(chatPreView);
        this.getContent()!.querySelector('.left-menu__chats')!.append(chatPreView.getContent()!);
    }

    public selectChat(chat: Chat): void {
        this.props.allPreview.forEach((ch: { props: { messageSelect: boolean; }; }) => {
            ch.props.messageSelect = false;
        });
        const list: MessageList = new MessageList({
            chatUser: chat.getUser(),
            allMessage: chat.getMessages(),
            dialogControl: this.children.dialogControlUser as DialogMenu,
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

function initDialogMenu(root: Element | null): DialogMenu {
        const dialogAddUser = new DialogAsk({
            title: 'Добавить пользователя',
            buttonCancelText: 'Отмена',
            buttonAddText: 'Добавить пользователя',
            inputPlaceholder: 'Пользователь',
            buttonAddType: 'positive',
            buttonAddFunction: (input_value) => {
                console.log('add ' + input_value);
            },
        });
        root!.append(dialogAddUser.getContent()!);

        const dialogRemoveUser = new DialogAsk({
            title: 'Удалить пользователя',
            buttonCancelText: 'Отмена',
            buttonAddText: 'Удалить пользователя',
            inputPlaceholder: 'Пользователь',
            buttonAddType: 'negative',
            buttonAddFunction: (input_value) => {
                console.log('delete ' + input_value);
            },
        });
        root!.append(dialogRemoveUser.getContent()!);

        const dialogControl = new DialogMenu({
            exitLabel: new Label({
                labelText: 'Удалить чат',
            }),
        });

        const linkAddUser: Label = new Label({
            labelText: 'Добавить пользователя',
            events: {
                click: () => {
                    if (dialogAddUser !== null) {
                        dialogAddUser.changeVisible();
                    }
                },
            },
        });

        const linkRemoveUser: Label = new Label({
            labelText: 'Удалить пользователя',
            events: {
                click: () => {
                    if (dialogRemoveUser !== null) {
                        dialogRemoveUser.changeVisible();
                    }
                },
            },
        });

        dialogControl.addSettingLink(linkAddUser);
        dialogControl.addSettingLink(linkRemoveUser);
        dialogControl.getContent()!.style.top = '8px';
        dialogControl.getContent()!.style.right = '16px';
        dialogControl.getContent()!.style.left = 'auto';

        root!.append(dialogControl.getContent()!);

        return dialogControl;
}

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#chat');

    const dialogSetting = new DialogMenu({
        exitLabel: new Label({
            labelText: 'Выйти',
        })
    });
    const chatList = new ChatPage({
        iconRocket: iconRocket,
        dialogSetting: dialogSetting,
        dialogControlUser: initDialogMenu(root),
    });
    ArrayChats.getArrayChats().forEach((value) => {
        chatList.addChat(value);
    });

    root!.append(chatList.getContent()!);
    root!.append(dialogSetting.getContent()!);

    chatList.dispatchComponentDidMount();
});
