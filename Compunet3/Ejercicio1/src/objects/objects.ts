//objetos
export const studentsIds = [1,2,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3];
console.log(studentsIds[0]); //Consultar una posición del arreglo
console.log(studentsIds.length); //Consultar la cantidad de elementos del arreglo
studentsIds.push(4); //Agregar un elemento al final del arreglo
console.log(studentsIds); //Consultar el arreglo completo

studentsIds.forEach((id) => console.log(id)); //Recorrer el arreglo y mostrar cada elemento

interface Student {
    id: number;
    name: string;
    age: number;
    isStudent: boolean;
    nickname?: string; //Propiedad opcional
}

export const miguel: Student = {
    id: 1,
    name: "Mike",
    age: 18,
    isStudent: true,
}

export const juanda: Student = {
    id: 2,
    name: "Juanda",
    age: 20,
    isStudent: true,
}

export const class03: Student[] = [];

class03.push(miguel);
class03.push(juanda);



//alt+shift+alt para comentar el codigo 
/* export const student = {
    id: 1,
    name: "Mike",
    age: 18,
    isStudent: true,
} */