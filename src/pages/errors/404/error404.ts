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
    constructor(props: Error404Props) {
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
    const error404 = document.querySelector('#error_404');

    const error404Page = new Error404Page({
        image404
    });
    error404!.append(error404Page.getContent()!);

    error404Page.dispatchComponentDidMount();
});
