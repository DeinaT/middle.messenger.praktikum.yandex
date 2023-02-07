import authorization_template from './authorization.hbs';
import '../../components/button/button.js'
import '../../components/input/input.js'
import '../../css/style.sass'

window.addEventListener('DOMContentLoaded', () => {
    const authorization = document.querySelector('#authorization');

    authorization.innerHTML = authorization_template();
});