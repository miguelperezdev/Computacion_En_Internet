import { Injectable } from '@nestjs/common';
import { StudentService } from '../student/student.service.js';
import { initialData } from './data/seed-student.data.js';

@Injectable()
export class SeedService {
  constructor(private readonly studentService: StudentService) {}

  /**
   * Borra los estudiantes existentes y carga los de prueba.
   * Devuelve JSON, como el resto de la API.
   */
  async runSeed(): Promise<{ message: string }> {
    await this.insertNewStudents();
    return { message: 'SEED EXECUTED' };
  }

  private async insertNewStudents(): Promise<boolean> {
    await this.studentService.deleteAllStudents();

    const { students } = initialData;
    await Promise.all(
      students.map((student) => this.studentService.createStudent(student)),
    );

    return true;
  }
}
