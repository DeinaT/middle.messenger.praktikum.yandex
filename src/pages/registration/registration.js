import registration_template from './registration.hbs';
import '../../components/button/button.js'
import '../../components/input/input.js'
import '../../css/style.sass'

window.addEventListener('DOMContentLoaded', () => {
    const registration = document.querySelector('#registration');

    registration.innerHTML = registration_template();
});
