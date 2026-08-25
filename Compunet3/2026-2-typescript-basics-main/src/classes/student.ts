import type { HttpAdapter } from "../interfaces/httpAdapter.interface";
import type { PokeAPI } from "../interfaces/pokeapi.interface";
import { PokeServiceAxios, PokeServiceFetch } from "../services/poke.service";

class Student {
    id:number;
    name: string;
    age: number;
    isActive: boolean;
    nickname:string;

    constructor(
        id:number, 
        name:string, 
        age:number, 
        isActve: boolean, 
        nickname: string,
        private httpAdapter: HttpAdapter

    ){
        this.id = id;
        this.name = name;
        this.age = age;
        this.isActive = isActve
        this.nickname = nickname
    }

    sayHello(){
        console.log("Hola mundo")
    }

    sumNumbers(number1: number, number2: number):number{
        return number1+number2;
    }

    get nameValue(){
        return this.name;
    }

    set setName(name: string){
        this.name = name;
    }

    async getScore():Promise<number>{
        return 10;
    }

    async getPokemon(pokemonName: string): Promise<PokeAPI>{
        return await this.httpAdapter.getPokemon<PokeAPI>(pokemonName);
    }


}

const pokeServiceFetch = new PokeServiceFetch();
const pokeServiceAxios = new PokeServiceAxios();
export const gus = new Student(1, "Gus", 35, true, "profe", pokeServiceAxios);
gus.sayHello();
const result = gus.sumNumbers(2,3);
console.log("🚀 ~ :28 ~ result:", result)
console.log("🚀 ~ :38 ~ gus.nameValue:", gus.nameValue)
gus.setName = "Gustavo"
console.log("🚀 ~ :38 ~ gus.nameValue:", gus.nameValue)
console.log(await gus.getScore())
gus.getScore().then(gus => console.log(gus))
const pikachu = await gus.getPokemon("pikachu");
console.log(pikachu.moves)


