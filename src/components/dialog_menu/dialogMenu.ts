import Block from '../../utils/block';
import template from './dialogMenu.hbs';
import './dialogMenu.sass';
import Label from '../label/label';

interface DialogMenuProps {
    linkLabels?: Array<Label>,
    exitLabel: Label,
}

export class DialogMenu extends Block {
    constructor(props: DialogMenuProps) {
        super('div', props);
        if (this.props.linkLabels === undefined) {
            this.props.linkLabels = [];
        }
        super.addInnerClass('div__for_dialog__menu');
        this.children.exitLabel.addInnerClass('cancel');
        this.getContent()!.style.display = 'none';
    }

    public addSettingLink(link: Label) {
        this.props.linkLabels.push(link);
        this.getContent()!.querySelector('.all_links')!.append(link.getContent()!);
    }

    public setCancelEvent(cancelFun: () => void): void {
        (this.children.exitLabel as Label).setClickEvent(cancelFun);
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default DialogMenu;
