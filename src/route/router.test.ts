import {MainRouter} from './router'
import {expect} from 'chai';
import sinon from 'sinon';
import Block from "../utils/block";


describe('Router', () => {
    let instance: MainRouter;

    global.window.history.back = () => {
        if (typeof window.onpopstate === 'function') {
            window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
        }
    };
    global.window.history.forward = () => {
        if (typeof window.onpopstate === 'function') {
            window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
        }
    };

    const getBackFake = sinon.fake.returns(document.createElement('a'));
    const getForwardFake = sinon.fake.returns(document.createElement('div'));
    const getMainFake = sinon.fake.returns(document.createElement('h1'));
    const getStartFake = sinon.fake.returns(document.createElement('p'));


    const MockMainPage = class {
        getContent = sinon.stub();
        show = getMainFake;
        hide = sinon.stub();
    } as unknown as typeof Block;

    const MockStartPage = class {
        getContent = getStartFake;
        show = sinon.stub();
        hide = sinon.stub();
    } as unknown as typeof Block;

    const MockBackPage = class {
        getContent = sinon.stub();
        show = getBackFake;
        hide = sinon.stub();
    } as unknown as typeof Block;

    const MockForwardPage = class {
        getContent = sinon.stub();
        show = getForwardFake;
        hide = sinon.stub();
    } as unknown as typeof Block;

    it('.use() - Проверка добавления матшрута в Router', () => {
        instance = new MainRouter('#app');
        const result = instance.use('/', MockStartPage);

        expect(result).to.eq(instance);
    });

    it('.start() - Проверка стартует ли роутер', () => {
        instance.use('/main', MockMainPage);
        instance.use('/back', MockBackPage);
        instance.use('/forward', MockForwardPage);
        instance.start();
        expect(getStartFake.callCount).to.eq(1);
    });

    it('.go() - Переход по заданому матшруту', () => {
        instance.go("/main");

        expect(getStartFake.callCount).to.eq(1);
        expect(getMainFake.callCount).to.eq(1);
    });

    it('.back() - Переход по истории назад', () => {
        instance.go("/back");
        instance.back();

        expect(getStartFake.callCount).to.eq(1);
        expect(getMainFake.callCount).to.eq(1);
        expect(getBackFake.callCount).to.eq(2);
        expect(getForwardFake.callCount).to.eq(0);
    });

    it('.forward() - Переход по истории вперед', () => {
        instance.go("/forward");
        instance.forward();

        expect(getStartFake.callCount).to.eq(1);
        expect(getMainFake.callCount).to.eq(1);
        expect(getBackFake.callCount).to.eq(2);
        expect(getForwardFake.callCount).to.eq(2);
    });
});
