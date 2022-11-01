import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { StudentsService } from './students.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SWAGGER_DEFAULT_200_RESPONSE,
  SWAGGER_DEFAULT_201_RESPONSE,
  SWAGGER_DEFAULT_204_RESPONSE,
} from '../constants/swaggerResponses.constant';
import { StudentDto } from './dtos/student.dto';
import { DefaultResponseDto } from '../dtos/defaultResponse.dto';
import { StatusCodesEnum } from '../enums/status.enum';

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
    type: DefaultResponseDto,
  })
  @ApiOperation({ description: 'Delete all of the students.' })
  @Delete()
  async deleteStudents() {
    const deleteOp = await this.studentService.deleteStudents();
    const res = new DefaultResponseDto();
    res.affected = deleteOp.deletedCount;
    res.status = StatusCodesEnum.OK;
    return res;
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
    type: DefaultResponseDto,
  })
  @ApiOperation({ description: 'Create students.' })
  @Post()
  async createStudents() {
    const students = await this.studentService.generateStudents(1000);
    const studentsInserted = await this.studentService.addStudents(students);
    const res = new DefaultResponseDto();
    res.affected = studentsInserted.length;
    res.status = StatusCodesEnum.OK;
    return res;
  }
}
