import chat_template from './chat_with_input.hbs';
import '../../components/button/button.js'
import '../../components/find/find.js'
import '../../components/message_item/message_item.js'
import '../../components/message_preview/message_preview.js'
import '../../css/style.sass'
import '../../css/chat.sass'
import '../../css/menu.sass'
import icon_find from '../../../static/icon/icon_find.png'
import icon_setting from '../../../static/icon/icon_setting.png'
import icon_add_object from '../../../static/icon/icon_add_object.png'
import icon_send_mess from '../../../static/icon/icon_send_mess.png'

window.addEventListener('DOMContentLoaded', () => {
    const chat = document.querySelector('#chat_with_input');

    chat.innerHTML = chat_template({icon_find, icon_setting, icon_send_mess, icon_add_object});
});
