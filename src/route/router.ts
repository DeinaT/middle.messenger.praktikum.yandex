import Block from '../utils/block';
import Route from './route';

class Router {

    private routes: Route[] = [];
    private history = window.history;
    private _currentRoute: Route | null = null;
    private _rootQuery: string = '';
    public static __instance: Router;


    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            this._onRoute(event.currentTarget!.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        this._currentRoute.render();
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string): Route | undefined {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router('#app');

