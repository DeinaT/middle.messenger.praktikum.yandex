import {Message} from "./Message";

export class Chat {
    private _user: string;
    private _message: Array<Message>;

    constructor(nameUser: string) {
        this._user = nameUser;
        this._message = [];
    }

    public getMessages(): Array<Message> {
        return this._message;
    }

    public getUser(): string {
        return this._user;
    }

    public addMessage(_newMessage: Message) {
        this._message.push(_newMessage);
    }

    public getLastMessage(): Message | undefined {
        return this._message.at(-1);
    }

    public getCountUnreadableMessage(): number {
        let count: number = 0;
        for (let value of this._message.slice().reverse()) {
            if (value.isRead || value.isYou)
                break;
            count++;
        }
        return count;
    }
}

