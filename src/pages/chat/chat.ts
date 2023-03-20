import template from './chat.hbs';
import '../../css/style.sass';
import '../../css/chat.sass';
import '../../css/menu.sass';
import iconRocket from '../../../static/icon/icon_rocket.png';
import FindInput from '../../components/find/find';
import Label from '../../components/label/label';
import DialogMenu from '../../components/dialog_menu/dialogMenu';
import DialogAsk from '../../components/dialog_ask/dialogAsk';
import MessagePreview from '../../components/message_preview/messagePreview';
import MessageList from '../../components/message_list/messageList';
import AuthController from "../../controllers/authController";
import Router from '../../route/router';
import {NavString} from "../../utils/navigation";
import ChatController from "../../controllers/chatController";
import BlockStore from "../../utils/blockStore";
import ChatInfo from "../../model/chatInfo";
import Message from "../../model/message";
import store from "../../objects/store";


class ChatPage extends BlockStore {
    constructor() {
        super('div', {
            iconRocket: iconRocket,
        }, storeChat => {
            console.log(storeChat.chats)
            storeChat.chats.forEach((chat: ChatInfo) => {
                this.addChat(chat);
            });
        });
        this.props.allPreview = [];

        this.props.events = {
            click: () => {
                this.showSetting();
            }
        };

        ChatController.fetchChats();
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

        this.initDialogMenu();

        this.children.messageList = new MessageList({
            dialogControl: this.children.dialogControl as DialogMenu,
        });

        this.setClassForEvent('for_event_menu');
    }

    public addChat(chat: ChatInfo): void {
        const lastMessage: Message = chat.last_message;
        let countUnreadableMessage = chat.unread_count;
        let showUnreadableMessage = (countUnreadableMessage > 0);
        const chatPreView = new MessagePreview({
            messageUser: chat.title,
            messageText: lastMessage.content,
            messageData: lastMessage.time,
            lastMessageIsYou: lastMessage.user_id === store.getState().user.id,
            showMessageCount: showUnreadableMessage,
            messageCount: countUnreadableMessage,
            events: {
                click: () => {
                    this.selectChat(chat);
                    chatPreView.setSelect(true);
                },
            },
        });

        this.removeAllChildNodes(this.getContent()!.querySelector('.left-menu__chats')!);
        this.props.allPreview.push(chatPreView);
        this.getContent()!.querySelector('.left-menu__chats')!.append(chatPreView.getContent()!);
    }

    public selectChat(chat: ChatInfo): void {
        ChatController.selectChat(chat.id);
        //(this.getContent()!.querySelector('.start_chat')! as HTMLDivElement).style.display = 'none';
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
