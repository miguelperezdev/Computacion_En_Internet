import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create_student.dto.js';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {

    
}