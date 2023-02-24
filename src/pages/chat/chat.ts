import template from './chat.hbs';
import '../../components/button/button.ts'
import '../../components/find/find.ts'
import '../../components/message_item/message_item.ts'
import '../../components/message_preview/message_preview.ts'
import '../../css/style.sass'
import '../../css/chat.sass'
import '../../css/menu.sass'
import Block from "../../utils/Block";
import icon_rocket from '../../../static/icon/icon_rocket.png'
import {FindInput} from "../../components/find/find";

interface ChatProps {
    icon_rocket: any
}
class Chat extends Block {

    constructor(props: ChatProps) {
        super('main', props);
    }

    init() {
        this.children.find_input = new FindInput({
            type_name: "find_user",
            input__value:""
        });
        console.log(this.children.find_input);
        this.children.find_input.getContent()!.style.width="70%";
        this.children.find_input.getContent()!.style.marginTop="10px";
    }

    render() {
        return this.compile(template, this.props);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#chat');

    const chatList = new Chat({
        icon_rocket: icon_rocket
    });
    root!.append(chatList.getContent()!);

    chatList.dispatchComponentDidMount();
    //chat.innerHTML = chat_template({icon_find, icon_rocket});
});
