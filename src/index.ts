import './css/style.sass';
import Router from "./route/router";
import Error404Page from "./pages/errors/404/error404";
import Error500Page from "./pages/errors/500/error500";
import AuthorizationPage from "./pages/authorization/authorization";
import RegistrationPage from "./pages/registration/registration";
import InformationPage from "./pages/information/information";

window.addEventListener('DOMContentLoaded', () => {
    const router = new Router("#app");

    router
        .use("/", AuthorizationPage)
        .use("/sign-up", RegistrationPage)
        .use("/setting", InformationPage)
        //.use("/messenger", ChatPage)
        .use("/404", Error404Page)
        .use("/500", Error500Page)
        .start();

});
