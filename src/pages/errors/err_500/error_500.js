import error_template from './error_500.hbs';
import '../../../components/button/button.js'
import '../../../components/input/input.js'
import '../../../css/style.sass'
import '../../../css/alert.sass'
import image_500 from '../../../../static/image/image_error_500.png'

window.addEventListener('DOMContentLoaded', () => {
    const error_500 = document.querySelector('#error_500');

    error_500.innerHTML = error_template({ image_500 });
});