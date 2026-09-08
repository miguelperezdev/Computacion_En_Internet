import express, {Application} from 

export class App{
	private app = Aplication;
	
	contructor (){
	this.app = express();
	}

	middleware(){
		this.app.use
	
	}

	settings(){
		this.app.set("port","3000")
	}

	router(){
		this.app.use("/")
	}
	
	listen(){
		this.app.listen("port", ()=> {
			console.log("Server living in port 3000")
		});
	}
}

