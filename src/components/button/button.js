import '../../components/button/button.sass'
import button_template from '../../components/button/button.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerPartial('button', button_template);