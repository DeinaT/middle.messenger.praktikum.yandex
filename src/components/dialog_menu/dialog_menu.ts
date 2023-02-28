import Block from '../../utils/Block';
import template from './dialog_menu.hbs';
import './dialog_menu.sass';
import {Label} from "../label/label";

interface DialogMenuProps {
    link_labels?: Array<Label>,
    exit_label: Label,
}

export class DialogMenu extends Block {
    constructor(props: DialogMenuProps) {
        super('div', props);
        if (this.props.link_labels === undefined)
            this.props.link_labels = [];
        super.addInnerClass("div__for_dialog__menu")
        this.children.exit_label.addInnerClass("cancel");
        this.getContent()!.style.display = "none"
    }

    public addSettingLink(link: Label) {
        this.props.link_labels.push(link);
        this.getContent()!.querySelector(".all_links")!.append(link.getContent()!);
    }

    public setCancelEvent(cancelFun: () => void): void {
        (this.children.exit_label as Label).setClickEvent(cancelFun);
    }

    render() {
        return this.compile(template, this.props);
    }
}
