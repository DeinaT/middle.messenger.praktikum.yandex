import {Message} from "./Message";

export class Chat {
    public _user: string;
    public _message: Array<Message>;

    constructor(nameUser: string) {
        this._user = nameUser;
        this._message = [];
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

