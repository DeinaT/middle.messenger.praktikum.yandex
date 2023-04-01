import {expect} from 'chai';
import sinon from 'sinon';
import proxyquire from "proxyquire";
import type BlockType from './block'
import Block from "./block";


describe('Block', () => {

    const eventBusMock = {
        on: sinon.fake(),
        emit: sinon.fake(),
    };

    const {default: Block2} = proxyquire('./block', {
        './eventBus': {
            EventBus: class {
                emit = eventBusMock.emit;
                on = eventBusMock.on;
            }
        }
    }) as { default: typeof BlockType };


    class ComponentMock extends Block2 {
        constructor() {
            super("div", {text: "text"})
        }

        public changeText(value: string) {
            this.props.text = value;
        }
    }

    class ComponentReal extends Block {
        constructor() {
            super("div", {
                text: "text"
            })
        }

        public changeText(value: string) {
            this.props.text = value;
        }

        render() {
            return this.compile(() => {
                return this.props.text;
            }, this.props);
        }
    }

    it('.init - Проверка интициализации компонентов', () => {
        new ComponentMock();

        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
    });

    it('.render - Проверка изменений props', () => {
        let componentMock = new ComponentMock();
        componentMock.changeText("text2");

        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
        expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
    });

    it('.getContent - Проверка создания html элемента и изменения', () => {
        let componentMock = new ComponentReal();
        expect(componentMock.getContent()!.outerHTML).to.eq('<div>text</div>');

        componentMock.changeText("text2");
        expect(componentMock.getContent()!.outerHTML).to.eq('<div>text2</div>');
    });
});
