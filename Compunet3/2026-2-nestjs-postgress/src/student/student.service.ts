import {
  Injectable, InternalServerErrorException, Logger, NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { Student } from './entities/student.entity.js';
import { Grades } from './entities/grades.entity.js';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';
import { PaginationDto } from './dto/pagination.dto.js';

@Injectable()
export class StudentService {
  private readonly logger = new Logger('StudentService');

  constructor(
    @InjectRepository(Grades)
    private readonly gradesRepository: Repository<Grades>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const { grades = [], ...studentDetails } = createStudentDto;
      const student = this.studentRepository.create({
        ...studentDetails,
        grades: grades.map((g) => this.gradesRepository.create(g)),
      });
      return await this.studentRepository.save(student);
    } catch (error) {
      throw this.handleException(error);
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<Student[]> {
    const { limit = 10, skip = 0 } = paginationDto;
    return this.studentRepository.find({ take: limit, skip });
  }

  async findOne(term: string): Promise<Student> {
    let student: Student | null;

    if (isUUID(term)) {
      student = await this.studentRepository.findOne({
        where: { id: term },
        relations: { grades: true },
      });
    } else {
      student = await this.studentRepository
        .createQueryBuilder('student')
        .where(
          'UPPER(student.name) = :name OR UPPER(student.nickname) = :nickname OR student.email = :email',
          {
            name: term.toUpperCase(),
            nickname: term.toUpperCase(),
            email: term.toLowerCase(),
          },
        )
        .leftJoinAndSelect('student.grades', 'grades')
        .getOne();
    }

    if (!student) {
      throw new NotFoundException(`Estudiante "${term}" no encontrado`);
    }
    return student;
  }

  async updateStudent(
    term: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const { grades, ...studentDetails } = updateStudentDto;

    // findOne resuelve por id (UUID), name, nickname o email y trae las grades
    const student = await this.findOne(term);

    const queryRunner = this.dataSource.createQueryRunner();   // ← dataSource con S mayúscula
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      this.studentRepository.merge(student, studentDetails);

      if (grades) {
        await queryRunner.manager.delete(Grades, { student: { id: student.id } });
        student.grades = grades.map((g) =>
          queryRunner.manager.create(Grades, { ...g, student }),
        );
      }

      const saved = await queryRunner.manager.save(student);
      await queryRunner.commitTransaction();
      return saved;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw this.handleException(error);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Elimina un estudiante (buscado por id, name, nickname o email).
   * Sus notas desaparecen con él por el `onDelete: "CASCADE"` de la relación.
   */
  async removeStudent(term: string): Promise<{ id: string; deleted: boolean }> {
    const student = await this.findOne(term);
    const { id } = student;

    await this.studentRepository.remove(student);
    return { id, deleted: true };
  }

  /** Borra todos los estudiantes. Sus notas caen por el CASCADE. */
  async deleteAllStudents(): Promise<boolean> {
    // TypeORM rechaza delete({}) (criteria vacío): se borra por ids.
    const students = await this.studentRepository.find({
      select: { id: true },
    });
    if (students.length > 0) {
      await this.studentRepository.delete(students.map(({ id }) => id));
    }
    return true;
  }

  private handleException(error: any): never {
    this.logger.error(error);
    if (error?.code === '23505') {
      throw new ConflictException(error.detail);
    }
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException(
      error?.message ?? 'Error interno del servidor',
    );
  }
}