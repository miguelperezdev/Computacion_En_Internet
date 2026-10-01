import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto.js';

/**
 * DTO de actualización: mismos campos y validaciones que `CreateStudentDto`,
 * pero todos opcionales. Así un `PATCH` solo exige los campos que se cambian.
 */
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
