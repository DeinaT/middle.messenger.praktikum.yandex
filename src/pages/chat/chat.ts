import template from './chat.hbs';
import '../../css/style.sass'
import '../../css/chat.sass'
import '../../css/menu.sass'
import Block from "../../utils/Block";
import {ArrayChats} from "../../objects/ArrayChats";
import {Chat} from "../../objects/Chat";
import icon_rocket from '../../../static/icon/icon_rocket.png'
import {FindInput} from "../../components/find/find";
import {Label} from "../../components/label/label";
import {DialogAsk} from "../../components/dialog_ask/dialog_ask";
import {DialogMenu} from "../../components/dialog_menu/dialog_menu";
import {MessagePreview} from "../../components/message_preview/message_preview";
import {Message} from "../../objects/Message";
import {MessageList} from "../../components/message_list/message_list";
import {Navigation} from "../../utils/Navigation";

interface ChatProps {
    icon_rocket: object,
    dialog_add_user: DialogAsk,
    dialog_setting: DialogMenu,
    all_preview?: Array<MessagePreview>
}

class ChatPage extends Block {

    constructor(props: ChatProps) {
        super('main', props);
        if (this.props.all_preview === undefined)
            this.props.all_preview = [];

        let linkSetting: Label = new Label({
            label__text: "Настройки",
            events: {
                click: () => {
                    window.location.href = "../" + Navigation.information;
                },
            },
        });
        (this.children.dialog_setting as DialogMenu).setCancelEvent(() =>
            window.location.href = "../" + Navigation.authorization
        );
        (this.children.dialog_setting as DialogMenu).addSettingLink(linkSetting);
        this.getContent()!.querySelector(".div__menu-user")!.addEventListener('click', () => {
            this.showSetting();
        });
    }

    private showSetting(): void {
        this.children.dialog_setting.changeVisible();
    }

    init() {
        this.children.find_input = new FindInput({type_name: "find_user"});

        this.children.find_input.getContent()!.style.width = "70%";
        this.children.find_input.getContent()!.style.marginTop = "10px";

        this.children.find_input.setClassForEvent("for_event")
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
            events: {
                click: () => {
                    this.selectChat(chat);
                    chatPreView.setSelect(true);
                }
            }
        });

        this.props.all_preview.push(chatPreView);
        this.getContent()!.querySelector(".left-menu__chats")!.append(chatPreView.getContent()!);
    }

    public selectChat(chat: Chat): void {
        this.props.all_preview.forEach((ch: { props: { message_select: boolean; }; }) => {
            ch.props.message_select = false;
        });
        let list: MessageList = new MessageList({
            chat_user: chat.getUser(),
            all_message: chat.getMessages(),
            dialog_add_user: this.children.dialog_add_user as DialogAsk
        });
        (this.getContent()!.querySelector(".start_chat")! as HTMLDivElement).style.display = "none";
        this.removeAllChildNodes(this.getContent()!.querySelector(".list_message")!);
        this.getContent()!.querySelector(".list_message")!.append(list.getContent()!);
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

    let dialogAddUser = new DialogAsk({title: ""});

    let dialogSetting = new DialogMenu({
        exit_label: new Label({
            label__text: "Выйти"
        })
    });
    const chatList = new ChatPage({
        icon_rocket: icon_rocket,
        dialog_add_user: dialogAddUser,
        dialog_setting: dialogSetting
    });
    ArrayChats.getArrayChats().forEach(value => {
        chatList.addChat(value);
    });

    root!.append(chatList.getContent()!);
    root!.append(dialogAddUser.getContent()!);
    root!.append(dialogSetting.getContent()!);

    chatList.dispatchComponentDidMount();
});
