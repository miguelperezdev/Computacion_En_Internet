//Tipos de datos
const nombre:string = "Gus";
let edad:number=35;

let id:string="113314323";

let telefono:string="31200000";

let isActive:boolean = true;

let mensaje:string = `
Este es un string
Es multilinea
me permite concatenar ${nombre}
me permite tener operaciones ${2+2}
...
`

console.log(mensaje)

console.log("1");
setTimeout(()=> console.log("2"));
Promise.resolve().then(()=> console.log("3"));
console.log("4")

export default mensaje;

