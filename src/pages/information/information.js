import information_template from './information.hbs';
import '../../components/button/button.js'
import '../../components/input/input.js'
import '../../css/style.sass'

window.addEventListener('DOMContentLoaded', () => {
    const information = document.querySelector('#information');

    information.innerHTML = information_template();
});