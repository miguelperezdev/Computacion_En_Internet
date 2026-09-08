import mongoose from "mongoose";

export interface StudentInput{
    name:string;
    age:number;
    email:string;
    isActive:boolean;
    nickname: string;
}

export interface StudentDocument extends StudentInput ,mongoose.Document{}

// TODO (Reto 1 - Bulk create): usa esta forma para la respuesta de POST /students/bulk
export interface BulkCreateResult {
    created: StudentDocument[];
    skipped: { email: string; reason: string }[];
}

// TODO (Reto 2 - Search): estos son los query params que debe aceptar GET /students/search
// Recuerda que Express siempre entrega los query params como string | undefined
export interface StudentSearchQuery {
    isActive?: string;
    minAge?: string;
    maxAge?: string;
    name?: string;
}

const studentSchema = new mongoose.Schema({
    name: { type: String, required : true},
    age: { type: Number, required: true},
    email: { type: String, required : true},
    isActive: { type: Boolean, required: true},
    nickname : { type: String, required: true}
}, { collection: "Students"});

export const StudentModel = mongoose.model<StudentDocument>("Student", studentSchema)


