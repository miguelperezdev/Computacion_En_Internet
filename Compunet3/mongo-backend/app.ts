import express, { application } from "express";
import { dbInstance } from "./src/lib/conectDb";

export class App{
    private app = application;

    constructor(){
        this.app = express();
        this.middleware();
        this.settings();
        //this.router();
    }

    middleware(){
        this.app.use(express.urlencoded({ extended: true}));
        this.app.use(express.json)
    }

    settings(){
        this.app.set("port", "3000")
    }

    router(){
        this.app.set("/students", "studentRouter")
    }

    listen(){
        dbInstance.then(
			() => {
				this.app.listen("port", ()=> 
		
        });
    }
}