"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
class App {
    app;
    //Vacio pq va a ser inicializado en otro lugar
    constructor() {
        //inicializamos express
        this.app = (0, express_1.default)();
        this.middeleware();
        this.settings;
        this.router;
        // this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(express.json());
    }
    // Componentes de express que se van a usar en la app
    middeleware() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
    }
    settings() {
        this.app.set("port", process.env.PORT || 3000);
    }
    router() {
        this.app.use("/", api_routes_1.default);
    }
    //Listen para inicializar el servidor
    listen() {
        this.app.listen(this.app.get("port"), () => {
            console.log("Servidor corriendo en el puerto", this.app.get("port"));
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map