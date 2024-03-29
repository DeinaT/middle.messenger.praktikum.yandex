import {EventBus} from './eventBus';
import {nanoid} from 'nanoid';


class Block<Prop extends Record<string, any> = any> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
        DELETE_EVENT: 'delete_event'
    };

    public id = nanoid(6);
    protected props: Prop;
    public children: Record<string, Block>;
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    private _classForEvent: string | null = null;
    private _meta: { tagName: string; props: any; };

    constructor(tagName = 'div', propsWithChildren: Prop) {
        const eventBus = new EventBus();

        const {props, children} = this._getChildrenAndProps(propsWithChildren);

        this._meta = {
            tagName,
            props
        };

        this.children = children;
        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);

        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildrenAndProps(childrenAndProps: Prop) {
        let props: Record<string, any> = {};
        const children: Record<string, Block> = {};

        if (childrenAndProps)
            Object.entries(childrenAndProps).forEach(([key, value]) => {
                if (value instanceof Block) {
                    children[key] = value;
                } else {
                    props[key] = value;
                }
            });

        return {props, children};
    }

    _addEvents() {
        const {events = {}} = this.props;
        Object.keys(events).forEach(eventName => {
            if (this._classForEvent !== null)
                this._element?.querySelector('.' + this._classForEvent)!.addEventListener(eventName, events[eventName]);
            else
                this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.DELETE_EVENT, this._removeEvents.bind(this));
    }

    _removeEvents() {
        if (this.props.events !== null && this.props.events !== undefined) {
            Object.keys(this.props.events).forEach(eventName => {
              if (this._classForEvent !== null) {
                  if (this._element?.querySelector('.' + this._classForEvent) !== null)
                    this._element?.querySelector('.' + this._classForEvent)!.removeEventListener(eventName, this.props.events[eventName]);
              } else
                  this._element?.removeEventListener(eventName, this.props.events[eventName]);
            });
        };
    }

    _createResources() {
        const {tagName} = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    private _init() {
        this._createResources();

        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {
    }

    _componentDidMount() {
        this.componentDidMount();
    }

    componentDidMount() {
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: Prop, newProps: Prop) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: Prop, newProps: Prop) {
        return (oldProps !== newProps);
    }

    setProps = (nextProps: Prop) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const fragment = this.render();

        this._removeEvents();
        this._element!.innerHTML = '';

        this._element!.append(fragment);

        this._addEvents();
    }

    public setClassForEvent(_classForEvent: string): Block {
        this._classForEvent = _classForEvent;
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        return this;
    }

    public getEventComponent(): HTMLElement {
        if (this._classForEvent !== null)
            return this._element?.querySelector('.' + this._classForEvent)!;
        else
            return this._element!;
    }

    public addInnerClass(_newClass: string) {
        this._element!.classList.add(_newClass);
    }

    public removeInnerClass(_newClass: string) {
        this._element!.classList.remove(_newClass);
    }

    protected compile(template: (context: any) => string, context: any): DocumentFragment {
        const contextAndStubs = {...context};

        Object.entries(this.children).forEach(([name, component]) => {
            contextAndStubs[name] = `<div data-id='${component.id}'></div>`;
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        Object.entries(this.children).forEach(([_, component]) => {
            const stub = temp.content.querySelector(`[data-id='${component.id}']`);

            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));

            stub.replaceWith(component.getContent()!);

        });

        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: any) {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = {...target}

                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty(target, prop) {
                if (prop === 'events') {
                    self.eventBus().emit(Block.EVENTS.DELETE_EVENT, Object.getOwnPropertyNames(target[prop])[0], target[prop]);
                    return true;
                } else {
                    throw new Error('Нет доступа');
                }
            }
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent()!.style.display = 'flex';
    }

    hide() {
        this.getContent()!.style.display = 'none';
    }

    changeVisible() {
        if (this.getContent()!.style.display === 'none')
            this.getContent()!.style.display = 'flex';
        else
            this.getContent()!.style.display = 'none';
    }
}

export default Block;
