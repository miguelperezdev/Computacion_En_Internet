import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { StudentService } from './student.service.js';
import { CreateStudentDto } from './dto/create_student.dto.js';
import { PaginationDto } from './dto/pagination.dto.js';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  @Get()
  findAll(@Query() paginationDto : PaginationDto)  {
    return this.studentService.findAll(paginationDto);
  }

  @Get()
  findOne(@Param('term') term: string) {
    return this.studentService.findOne(term);
  }
}