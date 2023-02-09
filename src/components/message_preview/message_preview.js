import '../../components/message_preview/message_preview.sass'
import message_preview_template from '../../components/message_preview/message_preview.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerPartial('message_preview', message_preview_template);