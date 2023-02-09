import error_template from './error_404.hbs';
import '../../../components/button/button.js'
import '../../../components/input/input.js'
import '../../../css/style.sass'
import '../../../css/alert.sass'
import image_404 from '../../../../static/image/image_error_404.png'

window.addEventListener('DOMContentLoaded', () => {
    const error_404 = document.querySelector('#error_404');

    error_404.innerHTML = error_template({ image_404 });
});