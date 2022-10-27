import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Get()
  getStudents() {
    return this.studentService.getStudents();
  }

  @Delete()
  deleteStudents() {
    return this.studentService.deleteStudents();
  }

  @Get(':id')
  getStudentWithId(@Param('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @Post()
  async createStudents() {
    const students = await this.studentService.generateStudents(1000);
    await this.studentService.addStudents(students);
  }
}
