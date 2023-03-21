import Block from '../../utils/block';
import template from './dialogSelectFile.hbs';
import './dialogSelectFile.sass';
import Label from '../label/label';
import Button from '../button/button';
import UserController from "../../controllers/userController";

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
        this.children.labelInfo = new Label({
            labelText: 'Выбрать файл',
            events: {
                click: () => {
                    this.importData();
                }
            },
        });
        this.children.labelInfo.getContent()!.style.marginTop = "20px";
        this.children.labelInfo.getContent()!.style.marginBottom = "20px";

        this.children.buttonAdd = new Button({
            buttonText: 'Изменить',
            buttonState: 'positive',
            events: {
                click: () => {
                    if (this.selectFile !== null){
                        UserController.changeAvatar(this.selectFile);
                        this.hide();
                    }
                },
            },
        });

        this.children.buttonAdd.getContent()!.style.marginTop = '20px';
        this.children.buttonAdd.getContent()!.style.width = '80%';

        this.children.buttonCancel = new Button({
            buttonText: 'Отмена',
            buttonState: 'neutral',
            events: {
                click: () => {
                    this.hide();
                },
            },
        });

        this.children.buttonCancel.getContent()!.style.marginTop = '20px';
        this.children.buttonCancel.getContent()!.style.width = '80%';
        this.getContent()!.style.display = 'none';
    }

    private importData(): void {
        let input = window.document.createElement('input');
        input.type = 'file';
        input.onchange = () => {
            if (input.files!.length === 1) {
                // @ts-ignore // из-за проверки выше всегда будет 1 элемент // в последующих спринтах это измениться
                this.selectFile = input.files[0];
                this.children.labelInfo.setProps({labelText: this.selectFile.name});
            }
        };
        input.click();
    }

    render() {
        return this.compile(template, this.props);
    }
}

export default DialogSelectFile;
