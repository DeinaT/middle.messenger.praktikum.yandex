const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export class HTTPTransport {
    get = (url, options = {}) => {
        return this.request(
            url,
            {...options, method: METHODS.GET},
            options.timeout
        );
    };

    post = (url, options = {}) => {
        return this.request(
            url,
            {...options, method: METHODS.POST},
            options.timeout
        );
    };

    put = (url, options = {}) => {
        return this.request(
            url,
            {...options, method: METHODS.PUT},
            options.timeout
        );
    };

    delete = (url, options = {}) => {
        return this.request(
            url,
            {...options, method: METHODS.DELETE},
            options.timeout
        );
    };

    request = (url, options = {}, timeout = 5000) => {
        const {headers = {}, method, data} = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(method, url);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr.responseText);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}
