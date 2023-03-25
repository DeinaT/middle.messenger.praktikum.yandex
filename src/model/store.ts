import {EventBus} from '../utils/eventBus';
import Block from '../utils/block';

export enum StoreEvents {
    Updated = 'updated'
}

export class Store extends EventBus {
    private state: any = {};

    public set(keypath: string, data: unknown) {
        set(this.state, keypath, data);

        this.emit(StoreEvents.Updated, this.getState());
    }

    public getState() {
        return this.state;
    }

    public clear() {
        this.state = {};
        this.emit(StoreEvents.Updated, this.getState());
    }
}

const store = new Store();

export function withStore(mapStateToProps: (state: any) => any) {

    return function wrap(Component: typeof Block) {
        let previousState: any;


        return class WithStore extends Component {

            constructor(props: any) {
                previousState = mapStateToProps(store.getState());

                super('div', {...props, ...previousState});

                store.on(StoreEvents.Updated, () => {
                    const stateProps = mapStateToProps(store.getState());

                    previousState = stateProps;

                    this.setProps({...stateProps});
                });
            }
        }

    }

}

export type Indexed<T = any> = {
    [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);

    return merge(object as Indexed, result);
}

export default store;
