import BaseApi from "./baseApi";


export class ResourcesApi extends BaseApi {
    constructor() {
        super('/resources');
    }

    getAvatar(avatar: string): Promise<Blob>  {
        return this.http.get(avatar);
    }

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}

export default ResourcesApi;
