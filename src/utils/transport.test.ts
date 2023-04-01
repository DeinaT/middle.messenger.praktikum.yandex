import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import HTTPTransport from './transport';
import { expect } from 'chai';

describe('HTTPTransport', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    let instanceChat: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        // @ts-ignore
        global.XMLHttpRequest = xhr;

        xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        });

        instance = new HTTPTransport('/auth');
        instanceChat = new HTTPTransport('/chat');
    });

    afterEach(() => {
        requests.length = 0;
    });

    it('.get() - Проверка get запроса', () => {
        instance.get('/user');

        const [request] = requests;

        expect(request.method).to.eq('GET');
    });

    it('.post() - Проверка post запроса', () => {
        instance.post('/logout');

        const [request] = requests;

        expect(request.method).to.eq('POST');
    });

    it('.delete() - Проверка delete запроса', () => {
        instanceChat.delete('/chats');

        const [request] = requests;

        expect(request.method).to.eq('DELETE');
    });

    it('.put() - Проверка put запроса', () => {
        instanceChat.put('/users', 1155);

        const [request] = requests;

        expect(request.method).to.eq('PUT');
    });
});
