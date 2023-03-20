import {ChatApi} from "../api/chatApi";
import store from "../objects/store";
import ChatInfo from "../model/chatInfo";
import MessagesController from "./messagesController";

export class ChatController {
    private readonly api: ChatApi;

    constructor() {
        this.api = new ChatApi();
    }

    async create(title: string) {
        await this.api.create(title);

        this.fetchChats();
    }

    async fetchChats() : Promise<ChatInfo[]> {
        const chats = await this.api.read();

        chats.map(async (chat) => {
            const token = await this.getToken(chat.id);

            await MessagesController.connect(chat.id, token);
        });

         store.set('chats', chats);

         return chats;
    }

    addUserToChat(id: number, userId: number) {
        this.api.addUsers(id, [userId]);
    }

    async delete(id: number) {
        await this.api.delete(id);

        this.fetchChats();
    }

    getToken(id: number) {
        return this.api.getToken(id);
    }

    selectChat(id: number) {
        store.set('selectedChat', id);
    }
}

export default new ChatController();
