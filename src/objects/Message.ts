export class Message {
    private text: string;

    private object: object;

    private data: string;

    private isYou: boolean;

    private isRead: boolean;

    private isDelivered: boolean;

    constructor(_text: string, _data: string, _isYou: boolean, _isRead?: boolean) {
        this.text = _text;
        this.data = _data;
        this.isYou = _isYou;
        this.isRead = (_isRead === undefined) ? true : _isRead;
    }

    get text(): string {
        return this.text;
    }

    get data(): string {
        return this.data;
    }

    get isYou(): boolean {
        return this.isYou;
    }

    get isRead(): boolean {
        return this.isRead;
    }

    get object(): object {
        return this.object;
    }

    get isDelivered(): boolean {
        return this.isDelivered;
    }
}

export default Message;
