import axios from 'axios';
import type { Pokeapi } from '../interfaces/pokeapi.interface';



class Student {
    id: number;
    name: string;
    age: number;
    isStudent: boolean;
    nickname?: string;

    constructor(id: number, name: string, age: number, isStudent: boolean, nickname?: string) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.isStudent = isStudent;
        this.nickname = nickname;
    }

    sayHello(){
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
        miguel.sayHello();
    }

    sumNumbers(a: number, b: number): number {
        return a + b;
    }

    get nameValue(): string {
        return this.name;
    }
    
    set setNamevalue(newName: string) {
        this.name = newName;
    }

    async getScore(): Promise<number> {
        return 100;
    }

    async getPokemon(pokeName : string){
        const url: string = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
        const result = await axios.get<Pokeapi>(url);
        return result.data;
    }



}

export const miguel = new Student(1, "Mike", 18, true);
miguel.sayHello();
const result = miguel.sumNumbers(5, 10);
console.log(miguel.sumNumbers(5, 10));
console.log(miguel.nameValue);
miguel.setNamevalue = "Miguelito";
console.log(miguel.nameValue);
console.log(await miguel.getScore());
miguel.getScore().then((score) => {
    console.log(score);
}  )

const Pikachu = await miguel.getPokemon("pikachu");
console.log(Pikachu.abilities);