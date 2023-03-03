import Message from './message';

export class Chat {
    private user: string;

    private message: Array<Message>;

    constructor(nameUser: string) {
        this.user = nameUser;
        this.message = [];
    }

    public getMessages(): Array<Message> {
        return this.message;
    }

    public getUser(): string {
        return this.user;
    }

    public addMessage(_newMessage: Message) {
        this.message.push(_newMessage);
    }

    public getLastMessage(): Message | undefined {
        return this.message.at(-1);
    }

    public getCountUnreadableMessage(): number {
        let count = 0;
        for (const value of this.message.slice().reverse()) {
            if (value.isRead || value.isYou) {
                break;
            }

            count++;
        }
        return count;
    }
}

export default Chat;
