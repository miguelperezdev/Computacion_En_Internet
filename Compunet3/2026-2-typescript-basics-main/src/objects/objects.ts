//Objetos
export const studentIds:number[] = [1,2,45,23,12];

console.log(studentIds[0]); // Consultar una posicion
studentIds.push(14);
console.log(studentIds);
studentIds.pop();
console.log(studentIds);

studentIds.forEach( id => console.log(id))

interface Student {
    id:number;
    name:string;
    age:number;
    isActive:boolean;
    nickname?:string;
}

export const gustavo: Student = {
    id: 1,
    name: "Gus",
    age: 35,
    isActive: true,
    nickname: "gusgo"
}

export const juanda : Student = {
    id: 2,
    name: "Juan David",
    age: 21,
    isActive: true
}

export const class03: Student[] = []

class03.push(gustavo);
class03.push(juanda);

