export class Message {
    public text: string;

    public object: object;

    public _data: string;

    public isYou: boolean;

    public isRead: boolean;

    public isDelivered: boolean;

    constructor(_text: string, _data: string, _isYou: boolean, _isRead?: boolean) {
        this.text = _text;
        this._data = _data;
        this.isYou = _isYou;
        this.isRead = (_isRead === undefined) ? true : _isRead;
    }
}

export default Message;
