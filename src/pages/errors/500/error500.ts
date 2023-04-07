import template from './error500.hbs';
import Button from '../../../components/button/button.ts';
import '../../../components/input/input.ts';
import '../../../css/style.sass';
import '../../../css/alert.sass';
import image500 from '../../../../static/image/image_error_500.png';
import Block from '../../../utils/block';

export class Error500Page extends Block {
    constructor() {
        super('div', { image500 });
    }

    init() {
        this.children.buttonBack = new Button({
            buttonText: 'Назад к чатам',
            buttonState: 'neutral',
            events: {
                click: () => {
                    // todo validate
                },
            },
        });

        this.children.buttonBack.getContent()!.style.marginTop = '170px';
    }

    render() {
        return this.compile(template, this.props);
    }
}
