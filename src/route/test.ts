import Router from "./router";
import {Chat} from "../pages/chat/chat";

const router = new Router(".app");

router
    .use("/", Chat)
    .start();


