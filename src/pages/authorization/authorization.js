import authorization_template from './authorization.hbs';
import '../../components/button/button.sass'
import '../../components/input/input.sass'
import '../../css/color.sass'
import '../../css/style.sass'
import image from '../../../static/image/image_background.png'

import button_template from '../../components/button/button.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';
Handlebars.registerPartial('button', button_template);

import input_template from '../../components/input/input.hbs';
Handlebars.registerPartial('input', input_template);


window.addEventListener('DOMContentLoaded', () => {
    const authorization = document.querySelector('#authorization');

    authorization.innerHTML = authorization_template({ image});
});