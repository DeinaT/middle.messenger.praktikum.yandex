import information_template from './information.hbs';
import '../../components/button/button.js'
import '../../components/input/input.js'
import '../../css/style.sass'
import '../../css/icon_avatar.sass'
import icon_empty_avatar from '../../../static/icon/icon_empty_avatar.png'

window.addEventListener('DOMContentLoaded', () => {
    const information = document.querySelector('#information');

    information.innerHTML = information_template({icon_empty_avatar});
});