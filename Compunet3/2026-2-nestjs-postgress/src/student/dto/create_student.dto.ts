import {
  IsString,
  IsNumber,
  IsPositive,
  IsEmail,
  IsBoolean,
  IsOptional,
  IsIn,
  IsArray,
  Min 
} from 'class-validator';
import { Grades } from '../entities/grades.entity.js';

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
  @IsIn(['Male', 'Female'])
  gender : string

  @IsArray()
  @IsOptional()
  favoriteSubjects: string[];

  @IsArray()
  @IsOptional()
  grades: Grades[];

}