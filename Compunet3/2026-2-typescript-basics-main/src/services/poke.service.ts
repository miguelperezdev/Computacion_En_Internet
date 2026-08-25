import axios from "axios";
import type { PokeAPI } from "../interfaces/pokeapi.interface";
import type { HttpAdapter } from "../interfaces/httpAdapter.interface";

 

export class PokeServiceAxios implements HttpAdapter {

    async getPokemon<T>(pokeName: string): Promise<T> {
        const url:string = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        const result = await axios.get<T>(url);
        return result.data;
    }

}

export class PokeServiceFetch implements HttpAdapter {

    async getPokemon<T>(pokeName: string): Promise<T> {
        const url:string = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
        const response = await fetch(url);
        const data: T = await response.json();
        return data;
    }
    
   
}