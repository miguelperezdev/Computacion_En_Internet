import { Application } from "express";
import express from "express";
export class App{

    private app: Application;

    //Vacio pq va a ser inicializado en otro lugar
    constructor(){
        //inicializamos express
        this.app = express();
        this.middeleware();
        // this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(express.json());
    }

    // Componentes de express que se van a usar en la app

    middeleware (){
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    settings (){
        this.app.set("port", process.env.PORT || 3000);
    }

    router(){
        this.app.use("/")
    }

    //Listen para inicializar el servidor
    listen(){
        this.app.listen(this.app.get("port"), ()=>{
            console.log("Servidor corriendo en el puerto", this.app.get("port"));
        })
    }

}