import './message_list.sass';
import '../message_item/message_item.sass';
import Block from '../../utils/Block';
import template from './message_list.hbs';
import iconSetting from '../../../static/icon/icon_setting.png';
import iconAddObject from '../../../static/icon/icon_add_object.png';
import iconSendMess from '../../../static/icon/icon_send_mess.png';
import Message from '../../objects/Message';
import MessageItem from '../message_item/message_item';
import DialogMenu from '../dialog_menu/dialog_menu';
import Label from '../label/label';
import DialogAsk from '../dialog_ask/dialog_ask';

interface MessageListProps {
    chat_user: string;
    all_message: Array<Message>;
    icon_setting?: object;
    icon_add_object?: object;
    icon_send_mess?: object;
    dialog_control?: DialogMenu;
    dialog_add_user?: DialogAsk;
}

export class MessageList extends Block {
    constructor(props: MessageListProps) {
        props.dialog_control = new DialogMenu({
            exit_label: new Label({
                label__text: 'Удалить чат',
            }),
        });
        props.icon_send_mess = iconSendMess;
        props.icon_setting = iconSetting;
        props.icon_add_object = iconAddObject;
        super('div', props);
        this.initListMessage();
        this.initControlMenu();
        this.initSendMessage()
    }

    private initDialogAskAsAdd(): void {
        (this.children.dialog_add_user as DialogAsk).setTypeButton('Добавить пользователя', 'positive');
        (this.children.dialog_add_user as DialogAsk).setFunctionButton(() => {
            console.log('add');
        });
    }

    private initDialogAskAsDelete(): void {
        (this.children.dialog_add_user as DialogAsk).setTypeButton('Удалить пользователя', 'negative');
        (this.children.dialog_add_user as DialogAsk).setFunctionButton(() => {
            console.log('delete');
        });
    }

    private initControlMenu(): void {
        const linkAddUser: Label = new Label({
            label__text: 'Добавить пользователя',
            events: {
                click: () => {
                    this.initDialogAskAsAdd();
                    this.children.dialog_add_user.changeVisible();
                },
            },
        });

        const linkRemoveUser: Label = new Label({
            label__text: 'Удалить пользователя',
            events: {
                click: () => {
                    this.initDialogAskAsDelete();
                    this.children.dialog_add_user.changeVisible();
                },
            },
        });

        (this.children.dialog_control as DialogMenu).addSettingLink(linkAddUser);
        (this.children.dialog_control as DialogMenu).addSettingLink(linkRemoveUser);
        this.children.dialog_control.getContent()!.style.top = '8px';
        this.children.dialog_control.getContent()!.style.right = '16px';
        this.children.dialog_control.getContent()!.style.left = 'auto';
    }

    private initListMessage(): void {
        this.props.all_message.forEach((m: { data: string; text: string; isYou: boolean; }) => {
            const message: MessageItem = new MessageItem({
                message_data: m.data,
                message_text: m.text,
                message_is_you: m.isYou,
            });

            this.getContent()!.style.height = 'inherit';
            if (this.getContent()!.querySelector('.all_message') !== null) {
                this.getContent()!.querySelector('.all_message')!.append(message.getContent()!);
            }
        });

        this.getContent()!.querySelector('.div__menu-user')!
            .addEventListener('click', () => {
                this.children.dialog_control.changeVisible();
            });
    }

    private initSendMessage(): void {
        this.getContent()!.querySelector('#icon_send_message')!.addEventListener('click', () => {
            console.log({message: this.getNewMessage()});
        });
    }

    public getNewMessage(): string {
        return (this.getContent()!.querySelector('.input__for-chat')! as HTMLInputElement).value;
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default MessageList;
