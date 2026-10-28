import { Gender, Student } from "@/interfaces/student.interface";

export const students: Student [] = [

    {
        id: "1",
        name: "Mike",
        age:19,
        email:"mike@gmail.com",
        gender:Gender.Male,
        favoriteSubjects:["Math","Science"],
        grades:[
            {id:"1",subject:"Math",grade:90},
            {id:"2",subject:"Science",grade:85}
        ],
        isActive:false,
        nickname:"la bestia",
        
    },
    {
        id: "4",
        name: "c",
        age:19,
        email:"c@gmail.com",
        gender:Gender.Female,
        favoriteSubjects:["English","History"],
        grades:[
            {id:"3",subject:"English",grade:88},
            {id:"4",subject:"History",grade:92}
        ],
        isActive:true,  
        nickname:"la bestia",
       
        
    },
    {
        id: "2",
        name: "b",
        age:19,
        email:"b@gmail.com",
        nickname:"la bestia",
        gender:Gender.Other,
        favoriteSubjects:["Art","Music"],
        grades:[
            {id:"5",subject:"Art",grade:95},
            {id:"6",subject:"Music",grade:89}
        ],
        isActive:true,  
        
    },
    {
        id: "3",
        name: "a",
        age:19,
        email:"a@gmail.com",
        nickname:"la bestia",
        gender:Gender.Male,
        favoriteSubjects:["Math","Science"],
        grades:[
            {id:"7",subject:"Math",grade:80},
            {id:"8",subject:"Science",grade:75}
        ],
        isActive:true,
        
    }
]