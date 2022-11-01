import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SWAGGER_DEFAULT_200_RESPONSE,
  SWAGGER_DEFAULT_201_RESPONSE,
  SWAGGER_DEFAULT_204_RESPONSE,
} from '../constants/swaggerResponses.constant';
import { StudentDto } from './dtos/student.dto';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @ApiResponse({
    ...SWAGGER_DEFAULT_200_RESPONSE,
    type: StudentDto,
  })
  @ApiOperation({ description: 'Get all of the students.' })
  @Get()
  getStudents() {
    return this.studentService.getStudents();
  }

  @ApiResponse({
    ...SWAGGER_DEFAULT_204_RESPONSE,
    type: StudentDto,
  })
  @ApiOperation({ description: 'Delete all of the students.' })
  @Delete()
  deleteStudents() {
    return this.studentService.deleteStudents();
  }

  @ApiResponse({
    ...SWAGGER_DEFAULT_200_RESPONSE,
    type: StudentDto,
  })
  @ApiOperation({ description: 'Get specific student using id' })
  @ApiParam({ name: 'id', description: 'Student id' })
  @Get(':id')
  getStudentWithId(@Param('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  @ApiResponse({
    ...SWAGGER_DEFAULT_201_RESPONSE,
    type: StudentDto,
  })
  @ApiOperation({ description: 'Create students.' })
  @Post()
  async createStudents() {
    const students = await this.studentService.generateStudents(1000);
    await this.studentService.addStudents(students);
  }
}
