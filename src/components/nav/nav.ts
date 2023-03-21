import Block from '../../utils/block';
import template from './nav.hbs';
import './nav.sass';
import Button from '../button/button';
import Navigation from '../../utils/navigation';

export class Nav extends Block {
    constructor() {
        super('nav', null);

        Object.values(Navigation).forEach((item: Navigation) => {
            const but = new Button({
                buttonText: item,
                buttonState: 'neutral',
                events: {
                    click: () => {
                        window.location.href = item;
                    },
                },
            });
            this.getContent()!.append(but.getContent()!);
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default Nav;
