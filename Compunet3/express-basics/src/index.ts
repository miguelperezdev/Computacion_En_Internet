import { App } from "./app";

function main (){

    const app = new App();
    app.settings();
    app.router();
    app.listen();
}

main();