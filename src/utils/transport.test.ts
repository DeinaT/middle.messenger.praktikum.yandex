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

    it('.get() should send GET request', () => {
        instance.get('/user');

        const [request] = requests;

        expect(request.method).to.eq('GET');
    });

    it('.post() should send POST request', () => {
        instance.post('/logout');

        const [request] = requests;

        expect(request.method).to.eq('POST');
    });

    it('.delete() should send POST request', () => {
        instanceChat.delete('/chats');

        const [request] = requests;

        expect(request.method).to.eq('DELETE');
    });

    it('.put() should send PUT request', () => {
        instanceChat.put('/users', 1155);

        const [request] = requests;

        expect(request.method).to.eq('PUT');
    });
});
