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
import AuthController from "../../controllers/authController";
import Router from '../../route/router';
import {NavString} from "../../utils/navigation";
import ChatController from "../../controllers/chatController";


class ChatPage extends Block {
    constructor() {
        super('div', {
            iconRocket: iconRocket,
        });
        this.props.allPreview = [];

        this.props.events = {
            click: () => {
                this.showSetting();
            }
        };
        this.setClassForEvent('for_event');

        /*ArrayChats.getArrayChats().forEach((value) => {
            this.addChat(value);
        });*/
        ChatController.fetchChats().then(chat => {
            console.log(chat);
        })

    }

    private showSetting(): void {
        this.children.dialogSetting.changeVisible();
    }

    private hideSetting(): void {
        this.children.dialogSetting.hide();
    }

    init() {
        this.children.findInput = new FindInput({
            typeName: 'find_user',
        });

        this.children.findInput.getContent()!.style.width = '70%';
        this.children.findInput.getContent()!.style.marginTop = '10px';


        this.children.dialogSetting = new DialogMenu({
            exitLabel: new Label({
                labelText: 'Выйти',
            })
        });

        const linkSetting: Label = new Label({
            labelText: 'Настройки',
            events: {
                click: () => {
                    this.hideSetting();
                    Router.go(NavString.INFORMATION);
                },
            },
        });

        (this.children.dialogSetting as DialogMenu).setCancelEvent(() => {
            this.hideSetting();
            AuthController.logout();
        });
        (this.children.dialogSetting as DialogMenu).addSettingLink(linkSetting);

        this.initDialogMenu()
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
            dialogControl: this.children.dialogControl as DialogMenu,
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

    private initDialogMenu(): void {
        this.children.dialogAddUser = new DialogAsk({
            title: 'Добавить пользователя',
            buttonCancelText: 'Отмена',
            buttonAddText: 'Добавить пользователя',
            inputPlaceholder: 'Пользователь',
            buttonAddType: 'positive',
            buttonAddFunction: (input_value) => {
                console.log('add ' + input_value);
            },
        });

        this.children.dialogRemoveUser = new DialogAsk({
            title: 'Удалить пользователя',
            buttonCancelText: 'Отмена',
            buttonAddText: 'Удалить пользователя',
            inputPlaceholder: 'Пользователь',
            buttonAddType: 'negative',
            buttonAddFunction: (input_value) => {
                console.log('delete ' + input_value);
            },
        });

        this.children.dialogControl = new DialogMenu({
            exitLabel: new Label({
                labelText: 'Удалить чат',
            }),
        });

        const linkAddUser: Label = new Label({
            labelText: 'Добавить пользователя',
            events: {
                click: () => {
                    if (this.children.dialogAddUser !== null) {
                        this.children.dialogAddUser.changeVisible();
                    }
                },
            },
        });

        const linkRemoveUser: Label = new Label({
            labelText: 'Удалить пользователя',
            events: {
                click: () => {
                    if (this.children.dialogRemoveUser !== null) {
                        this.children.dialogRemoveUser.changeVisible();
                    }
                },
            },
        });

        (this.children.dialogControl as DialogMenu).addSettingLink(linkAddUser);
        (this.children.dialogControl as DialogMenu).addSettingLink(linkRemoveUser);
        this.children.dialogControl.getContent()!.style.top = '8px';
        this.children.dialogControl.getContent()!.style.right = '16px';
        this.children.dialogControl.getContent()!.style.left = 'auto';
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default ChatPage;
