import template from './error500.hbs';
import '../../../components/button/button.ts';
import '../../../components/input/input.ts';
import '../../../css/style.sass';
import '../../../css/alert.sass';
import image500 from '../../../../static/image/image_error_500.png';
import Block from '../../../utils/block';
import Button from '../../../components/button/button';

interface Error500Props {
    image500: object;
}

class Error500Page extends Block {
    constructor(props: Error500Props) {
        super('main', props);
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

window.addEventListener('DOMContentLoaded', () => {
    const error500 = document.querySelector('#error_500');

    const error500Page = new Error500Page({
        image500
    });
    error500!.append(error500Page.getContent()!);

    error500Page.dispatchComponentDidMount();
});
