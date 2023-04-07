import Block from '../utils/block';
import { Route } from './route';

export class MainRouter {
    private routes: Route[] = [];

    private history = window.history;

    private _currentRoute: Route | null = null;

    private _rootQuery = '';

    public static __instance: MainRouter;

    constructor(rootQuery: string) {
        if (MainRouter.__instance) {
            return MainRouter.__instance;
        }

        this._currentRoute = null;
        this._rootQuery = rootQuery;

        MainRouter.__instance = this;
    }

    use(pathname: string, block: typeof Block) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            if (event.currentTarget) {
                this._onRoute((event.currentTarget as typeof window).location.pathname);
            }
        });

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
        return this.routes.find((route) => route.match(pathname));
    }
}

export const Router = new MainRouter('#app');
