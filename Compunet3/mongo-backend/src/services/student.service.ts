import { StudentDocument } from "../models/student.model";
import {StudentModel} from "../models/student.model"; // Importa el modelo

class StudentService {
    async findAll(): Promise<StudentDocument[] | undefined> {
        try {
            const students: StudentDocument[] = await StudentModel.find();
            return students;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default StudentService; // Exporta la clase