import Block from "../utils/block";

function render(query: string, block: Block|null) {
    const root = document.querySelector(query);

    if (root !== null) {

        root.innerHTML = '';

        root.append(block!.getContent()!);

    }
    return root;
}

function isEqual(lhs: any, rhs: any) {
    return lhs === rhs;
}

class Route {
    private _pathname: string;
    private _blockClass: typeof Block;
    private _block: Block | null = null;
    private _props: any;

    constructor(pathname: string, view: typeof Block, props: any) {
        this._pathname = pathname;
        this._blockClass = view;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass("", {});
        }
        render(this._props.rootQuery, this._block);
        this._block.show();
        return;
    }
}

export default Route;
