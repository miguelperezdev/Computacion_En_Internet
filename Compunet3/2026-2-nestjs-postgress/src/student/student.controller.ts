import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service.js';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';
import { PaginationDto } from './dto/pagination.dto.js';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  /** POST /api/student */
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  /** GET /api/student?limit=10&skip=0 */
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.studentService.findAll(paginationDto);
  }

  /** GET /api/student/:term — por id (UUID), name, nickname o email */
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.studentService.findOne(term);
  }

  /** PATCH /api/student/:id */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  /** DELETE /api/student/:id */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.removeStudent(id);
  }
}
