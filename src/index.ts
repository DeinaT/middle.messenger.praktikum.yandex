import './css/style.sass';
import {Router} from './route/router';
import {Navigation} from "./utils/navigation";

window.addEventListener('DOMContentLoaded', () => {
    Navigation.initRouter();
    Router.start();
});
