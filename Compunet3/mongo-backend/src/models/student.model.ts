import { Collection } from "mongodb";
import mongoose from "mongoose";

export interface StudentInput {
    name:string;
    age:number;
    isActive:boolean;
    nickname: string 
}

export interface StudentDocument extends mongoose.Document{}

const studentSchema = new mongoose.Schema({
    name: {type: String,required :true},
    age: {type: Number, required:true},
    isActive: {type:Boolean,required:true},
    nickname: {type:String, required:true}
}, {collection: "Student"});

export const StudentModel = mongoose.model<StudentDocument>("student,studentSchema)