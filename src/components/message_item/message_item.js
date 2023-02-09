import '../../components/message_item/message_item.sass'
import message_item_template from '../../components/message_item/message_item.hbs';
import Handlebars from 'handlebars/dist/handlebars.runtime';

Handlebars.registerPartial('message_item', message_item_template);