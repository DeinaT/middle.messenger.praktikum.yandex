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
import Icon from '../icon/icon';

interface MessageListProps {
    chatUser: string;
    allMessage: Array<Message>;
    iconSetting?: Icon;
    iconAddObject?: Icon;
    iconSendMess?: Icon;
    dialogControl: DialogMenu;
}

export class MessageList extends Block {
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
                    console.log({message: this.getNewMessage()});
                },
            },
        });

        super('div', props);
        this.initListMessage();
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
