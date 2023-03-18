import User from "../objects/user";

export class ChatInfo {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: User,
        time: string;
        content: string;
    }
}

export default ChatInfo;