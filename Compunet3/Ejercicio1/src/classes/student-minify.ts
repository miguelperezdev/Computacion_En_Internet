class Student {

    constructor(
        public id: number,
        public name: string,
        public age: number,
        public isStudent: boolean,
        public nickname?: string){}
}    

export const miguel2 = new Student(1, "Mike", 18, true);