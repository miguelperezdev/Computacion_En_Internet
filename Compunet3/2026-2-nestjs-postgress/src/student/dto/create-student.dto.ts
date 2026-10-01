import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

/** Nota de una materia: `subject` (materia) y `grade` (calificación). */
export class GradeDto {
  @IsString()
  subject: string;

  @IsNumber()
  grade: number;
}

/**
 * Reglas de validación para crear un estudiante.
 * Se usa también como base de `UpdateStudentDto` (ver `update-student.dto.ts`).
 */
export class CreateStudentDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  age: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  isActive: boolean;

  @IsString()
  @IsIn(['Male', 'Female', 'Other'])
  gender: string;

  @IsArray()
  @IsOptional()
  favoriteSubjects?: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => GradeDto)
  grades?: GradeDto[];
}
