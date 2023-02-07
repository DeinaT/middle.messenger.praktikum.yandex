import changes_password_template from './changes-password.hbs';
import '../../components/button/button.js'
import '../../components/input/input.js'
import '../../css/style.sass'

window.addEventListener('DOMContentLoaded', () => {
    const changes_password = document.querySelector('#changes_password');

    changes_password.innerHTML = changes_password_template();
});