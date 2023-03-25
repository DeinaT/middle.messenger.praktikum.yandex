import Block from './block';
import store, {StoreEvents} from '../model/store';


class BlockStore extends Block {

    constructor(tagName = 'div', props: any, mapStateToProps?: (state: any) => any) {
        super(tagName, {...props});

        if (mapStateToProps) {
            store.on(StoreEvents.Updated, () => {
                const stateProps = mapStateToProps(store.getState());
                this.setProps({...stateProps});
            });
        }
    }
}

export default BlockStore;
