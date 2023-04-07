import Message from './message';

export class ChatInfo {
    id: number;

    title: string;

    avatar: string;

    unread_count: number;

    last_message: Message;
}

export default ChatInfo;
