import Block from '../../utils/Block';
import template from './nav.hbs';
import './nav.sass';
import {Button} from "../button/button";
import {Navigation} from "../../utils/Navigation";


export class Nav extends Block {
    constructor() {
        super('nav', null);

        Object.values(Navigation).forEach((item: Navigation) => {
            const but = new Button({
                button__text: item,
                button__state: "neutral",
                events: {
                    click: () => {
                        window.location.href = item;
                    },
                },
            });
            this.getContent()!.append(but.getContent()!);
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
