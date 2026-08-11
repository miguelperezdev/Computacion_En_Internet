
//tipos de dato
const nombre:string = "Mike"
let edad:number = 18
let id:string = "123456789"
let esEstudiante:boolean = true
let mensaje:string = `
Hola, mi nombre es ${nombre} y tengo ${edad} años. ¿Soy estudiante? ${esEstudiante}

Es multilinea
Me permite concatenar variables y texto ${nombre} y ${edad}
me permite hacer saltos de linea
me permite tener operaciones dentro de las llaves ${edad + 10}
...

`
console.log(mensaje)

console.log("1"); '1'
setTimeout(() => console.log("2")); '2' 
Promise.resolve().then(() =>  console.log("3")); 
console.log("4"); '4'


export default mensaje;