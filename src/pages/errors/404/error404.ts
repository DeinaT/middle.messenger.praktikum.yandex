import template from './error404.hbs';
import '../../../components/button/button.ts';
import '../../../components/input/input.ts';
import '../../../css/style.sass';
import '../../../css/alert.sass';
import image404 from '../../../../static/image/image_error_404.png';
import Block from '../../../utils/block';
import Button from '../../../components/button/button';

interface Error404Props {
    image404: object;
}

class Error404Page extends Block {
    constructor() {
        let prop: Error404Props = {
            image404: image404,
        }
        super('div', prop);
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

export default Error404Page;
