import HTTPTransport from '../utils/transport';

export default abstract class BaseApi {
    protected http: HTTPTransport;

    protected constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint);
    }
}
