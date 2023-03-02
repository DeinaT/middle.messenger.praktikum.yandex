import Chat from './Chat';
import Message from './Message';

export class ArrayChats {
    public static getArrayChats(): Array<Chat> {
        const chats: Array<Chat> = [];
        const chat1: Chat = new Chat('user1');
        chat1.addMessage(new Message('some_text', '20.10.2022', false));
        chat1.addMessage(new Message('some_text 111111', '22.10.2022', true));
        chat1.addMessage(new Message('some_text 222222222', '23.10.2022', false, false));
        chat1.addMessage(new Message('some_text 33333333333', '26.01.2022', false, false));
        chats.push(chat1);

        const chat2: Chat = new Chat('user');
        chat2.addMessage(new Message('some_text', '20.10.2022', false));
        chat2.addMessage(new Message('some_text 111111', '22.10.2022', true));
        chat2.addMessage(new Message('some_text 222222222', '23.10.2022', false));
        chat2.addMessage(new Message('some_text 33333333333', '26.10.2022', true));
        chats.push(chat2);

        const chat3: Chat = new Chat('ksjdcnisdn');
        chat3.addMessage(new Message('some_text', '20.10.2022', false));
        chat3.addMessage(new Message('some_text 111111', '22.10.2022', true));
        chat3.addMessage(new Message('some_text 222222222', '23.10.2022', false));
        chat3.addMessage(new Message('sdiujsid', '10:50', false, false));
        chats.push(chat3);

        return chats;
    }
}

export default ArrayChats;
