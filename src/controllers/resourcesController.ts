import ResourcesApi from "../api/resourcesApi";

export class ResourcesController {
    private readonly api: ResourcesApi;

    constructor() {
        this.api = new ResourcesApi();
    }

    async getAvatar(data: string) {
        await this.api.getAvatar(data).then(avatar => {
            //window.URL.createObjectURL(avatar);
        });
    }
}

export default new ResourcesController();
