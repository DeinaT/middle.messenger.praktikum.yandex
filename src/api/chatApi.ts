import ChatInfo from '../model/chatInfo';
import User from '../model/user';
import BaseApi from './baseApi';


export class ChatApi extends BaseApi {
    constructor() {
        super('/chats');
    }

    create(title: string) {
        return this.http.post('/', {title});
    }

    delete(id: number): Promise<unknown> {
        return this.http.delete('/', {chatId: id});
    }

    read(): Promise<ChatInfo[]> {
        return this.http.get('/');
    }

    getUsers(id: number): Promise<Array<User & { role: string }>> {
        return this.http.get(`/${id}/users`);
    }

    addUsers(id: number, users: number[]){
        this.http.put('/users', {users, chatId: id});
    }

    deleteUserToChat(id: number, users: number[]): Promise<unknown> {
        return this.http.delete('/users', {users, chatId: id});
    }

    async getToken(id: number): Promise<string> {
        const response = await this.http.post<{ token: string }>(`/token/${id}`);

        return response.token;
    }

    update = undefined;
}
