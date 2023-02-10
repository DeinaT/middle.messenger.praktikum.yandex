import chat_template from './chat.hbs';
import '../../components/button/button.js'
import '../../components/find/find.js'
import '../../components/message_item/message_item.js'
import '../../components/message_preview/message_preview.js'
import '../../css/style.sass'
import '../../css/chat.sass'
import '../../css/menu.sass'
import icon_find from '../../../static/icon/icon_find.png'
import icon_rocket from '../../../static/icon/icon_rocket.png'

window.addEventListener('DOMContentLoaded', () => {
    const chat = document.querySelector('#chat');

    chat.innerHTML = chat_template({icon_find, icon_rocket});
});
