export class Message {
    private _text: string;
    private _object: object;
    private _data: string;
    private _isYou: boolean;
    private _isRead: boolean;
    private _isDelivered: boolean;

    constructor(_text: string, _data: string, _isYou: boolean, _isRead?: boolean) {
        this._text = _text;
        this._data = _data;
        this._isYou = _isYou;
        this._isRead = (_isRead === undefined) ? true : _isRead;
    }

    get text(): string {
        return this._text;
    }

    get data(): string {
        return this._data;
    }

    get isYou(): boolean {
        return this._isYou;
    }

    get isRead(): boolean {
        return this._isRead;
    }

    get object(): object {
        return this._object;
    }

    get isDelivered(): boolean {
        return this._isDelivered;
    }
}
