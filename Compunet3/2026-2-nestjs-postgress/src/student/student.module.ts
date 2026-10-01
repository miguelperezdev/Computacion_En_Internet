import { Module } from '@nestjs/common';
import { StudentService } from './student.service.js';
import { StudentController } from './student.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity.js';
import { Grades } from './entities/grades.entity.js'; 

@Module({
  controllers: [StudentController],
  imports:[
    TypeOrmModule.forFeature([Student, Grades])
  ],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
