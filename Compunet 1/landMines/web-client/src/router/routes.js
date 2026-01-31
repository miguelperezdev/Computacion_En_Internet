import  Game from "../pages/GamePage.js";
import  Home  from "../pages/Home.js";
import { Router } from "./Router.js";

const urls = {
    "/": Home,
    "/game": Game,
}

export const routes = Router(urls);