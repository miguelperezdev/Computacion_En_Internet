class Student {

    constructor(
        public id:number, 
        public name: string, 
        public age : number, 
        public isActive: boolean, 
        public nickname: string){}

}

export const gus2 = new Student(1, "Gus", 35, true, "profe");