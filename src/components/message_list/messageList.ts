import './messageList.sass';
import '../message_item/messageItem.sass';
import Block from '../../utils/block';
import template from './messageList.hbs';
import iconSetting from '../../../static/icon/icon_setting.png';
import iconAddObject from '../../../static/icon/icon_add_object.png';
import iconSendMess from '../../../static/icon/icon_send_mess.png';
import Message from '../../objects/message';
import MessageItem from '../message_item/messageItem';
import DialogMenu from '../dialog_menu/dialogMenu';
import Label from '../label/label';
import Icon from '../icon/icon';
import DialogAsk from '../dialog_ask/dialogAsk';

interface MessageListProps {
    chatUser: string;
    allMessage: Array<Message>;
    iconSetting?: Icon;
    iconAddObject?: Icon;
    iconSendMess?: Icon;
}

export class MessageList extends Block {
    private dialogAddUser: DialogAsk | null = null;
    private dialogRemoveUser: DialogAsk | null = null;
    private dialogControl: DialogMenu | null = null;

    constructor(props: MessageListProps) {
        props.iconSetting = new Icon({
            iconSrc: iconSetting,
            iconAlt: 'Иконка настроек',
            events: {
                click: () => {
                    if (this.dialogControl !== null) {
                        this.dialogControl.changeVisible();
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
                    console.log({message: this.getNewMessage()});
                },
            },
        });


        super('div', props);
        this.initDialogAskAdd();
        this.initDialogAskDelete();
        this.initListMessage();
        this.initControlMenu();
    }

    private initDialogAskAdd(): void {
        this.dialogAddUser = new DialogAsk({
            title: 'Добавить пользователя',
            buttonCancelText: 'Отмена',
            buttonAddText: 'Добавить пользователя',
            inputPlaceholder: 'Пользователь',
            buttonAddType: 'positive',
            buttonAddFunction: (input_value) => {
                console.log('add ' + input_value);
            },
        });

        const root = window.document.querySelector('body');
        root!.append(this.dialogAddUser.getContent()!);
    }

    private initDialogAskDelete(): void {
        this.dialogRemoveUser = new DialogAsk({
            title: 'Удалить пользователя',
            buttonCancelText: 'Отмена',
            buttonAddText: 'Удалить пользователя',
            inputPlaceholder: 'Пользователь',
            buttonAddType: 'negative',
            buttonAddFunction: (input_value) => {
                console.log('delete ' + input_value);
            },
        });

        const root = window.document.querySelector('body');
        root!.append(this.dialogRemoveUser.getContent()!);
    }

    private initControlMenu(): void {
        this.dialogControl = new DialogMenu({
            exitLabel: new Label({
                labelText: 'Удалить чат',
            }),
        });

        const linkAddUser: Label = new Label({
            labelText: 'Добавить пользователя',
            events: {
                click: () => {
                    if (this.dialogAddUser !== null) {
                        this.dialogAddUser.changeVisible();
                    }
                },
            },
        });

        const linkRemoveUser: Label = new Label({
            labelText: 'Удалить пользователя',
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
        this.props.allMessage.forEach((m: { data: string; text: string; isYou: boolean; }) => {
            const message: MessageItem = new MessageItem({
                messageData: m.data,
                messageText: m.text,
                messageIsYou: m.isYou,
            });

            this.getContent()!.style.height = 'inherit';
            if (this.getContent()!.querySelector('.all_message') !== null) {
                this.getContent()!.querySelector('.all_message')!.append(message.getContent()!);
            }
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
