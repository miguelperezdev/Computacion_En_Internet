import express, { Application } from "express"
import { studentRouter } from "./routes/student.route";
import { dbInstace } from "./lib/connectDb";

export class App {
    private app:Application;

    constructor(){
        this.app = express();
        this.middleware();
        this.settings();
        this.router();
    }

    middleware(){
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
    }

    settings(){
        this.app.set("port",8081)
    }

    router(){
        this.app.use("/students", studentRouter)
    }

    listen(){
        dbInstace.then(
            () => {
                this.app.listen(this.app.get("port"));
                console.log(`Server running in port ${this.app.get("port")}`);
            }
        )  
    }
}