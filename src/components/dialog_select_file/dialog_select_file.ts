import Block from '../../utils/Block';
import template from './dialog_select_file.hbs';
import './dialog_select_file.sass';
import Label from '../label/label';
import Button from '../button/button';

interface DialogSelectFileProps {
    title: string;
}

export class DialogSelectFile extends Block {
    selectFile: File | null = null;

    constructor(props: DialogSelectFileProps) {
        super('div', props);
        super.addInnerClass('div__for_dialog__dialog_ask');
    }

    init() {
        this.children.label__info = new Label({
            label__text: 'Выбрать файл',
            events: {
                click: () => {
                    this.importData();
                }
            },
        });
        this.children.label__info.getContent()!.style.marginTop = "20px"
        this.children.label__info.getContent()!.style.marginBottom = "20px"

        this.children.button__add = new Button({
            button__text: 'Изменить',
            button__state: 'positive',
            events: {
                click: () => {
                    if (this.selectFile !== null)
                        console.log(this.selectFile);
                },
            },
        });

        this.children.button__add.getContent()!.style.marginTop = '20px';
        this.children.button__add.getContent()!.style.width = '80%';

        this.children.button__cancel = new Button({
            button__text: 'Отмена',
            button__state: 'neutral',
            events: {
                click: () => {
                    this.hide();
                },
            },
        });

        this.children.button__cancel.getContent()!.style.marginTop = '20px';
        this.children.button__cancel.getContent()!.style.width = '80%';
        this.getContent()!.style.display = 'none';
    }

    private importData(): void {
        let input = window.document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
            if (input.files!.length === 1) {
                // @ts-ignore // из-за проверки выше всегда будет 1 элемент // в последующих спринтах это измениться
                this.selectFile = input.files[0];
                this.children.label__info.setProps({label__text: this.selectFile.name});
            }
        };
        input.click();
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default DialogSelectFile;
