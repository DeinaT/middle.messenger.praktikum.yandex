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
}

export class MessageList extends Block {
    private dialogAddUser: DialogAsk | null = null;
    private dialogRemoveUser: DialogAsk | null = null;
    private dialogControl: DialogMenu | null = null;

    constructor(props: MessageListProps) {
        props.icon_send_mess = iconSendMess;
        props.icon_setting = iconSetting;
        props.icon_add_object = iconAddObject;
        super('div', props);
        this.initDialogAskAdd();
        this.initDialogAskDelete();
        this.initListMessage();
        this.initControlMenu();
        this.initSendMessage()
    }

    private initDialogAskAdd(): void {
        this.dialogAddUser = new DialogAsk({
            title: 'Добавить пользователя',
            button_cancel_text: 'Отмена',
            button_add_text: 'Добавить пользователя',
            input_placeholder: 'Пользователь',
            button_add_type: 'positive',
            button_add_function: (input_value) => {
                console.log('add ' + input_value);
            },
        });

        const root = window.document.querySelector('body');
        root!.append(this.dialogAddUser.getContent()!);
    }

    private initDialogAskDelete(): void {
        this.dialogRemoveUser = new DialogAsk({
            title: 'Удалить пользователя',
            button_cancel_text: 'Отмена',
            button_add_text: 'Удалить пользователя',
            input_placeholder: 'Пользователь',
            button_add_type: 'negative',
            button_add_function: (input_value) => {
                console.log('delete ' + input_value);
            },
        });

        const root = window.document.querySelector('body');
        root!.append(this.dialogRemoveUser.getContent()!);
    }

    private initControlMenu(): void {
        this.dialogControl = new DialogMenu({
            exit_label: new Label({
                label__text: 'Удалить чат',
            }),
        });

        const linkAddUser: Label = new Label({
            label__text: 'Добавить пользователя',
            events: {
                click: () => {
                    if (this.dialogAddUser !== null) {
                        this.dialogAddUser.changeVisible();
                    }
                },
            },
        });

        const linkRemoveUser: Label = new Label({
            label__text: 'Удалить пользователя',
            events: {
                click: () => {
                    if (this.dialogRemoveUser !== null) {
                        this.dialogRemoveUser.changeVisible();
                    }
                },
            },
        });

        this.dialogControl.addSettingLink(linkAddUser);
        this.dialogControl.addSettingLink(linkRemoveUser);
        this.dialogControl.getContent()!.style.top = '8px';
        this.dialogControl.getContent()!.style.right = '16px';
        this.dialogControl.getContent()!.style.left = 'auto';

        const root = window.document.querySelector('body');
        root!.append(this.dialogControl.getContent()!);
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
                if (this.dialogControl !== null) {
                    this.dialogControl.changeVisible();
                }
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
