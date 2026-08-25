export interface HttpAdapter {
    getPokemon<T>(pokeName:string): Promise<T>;
}