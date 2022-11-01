import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { InvalidDateException } from './exceptions/invalidDate.exception';
import { StartExamDto } from './dtos/startExam.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatusCodesEnum } from '../enums/status.enum';
import { DefaultResponseDto } from '../dtos/defaultResponse.dto';

@ApiTags('Exam')
@Controller('/')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @ApiOperation({ description: 'Start exam at the specific date' })
  @Get('startExam')
  @ApiResponse({
    status: 200,
    description: 'Exam finished successfully',
    type: DefaultResponseDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async startExam(@Query() examDate: StartExamDto) {
    const date = new Date(examDate.examDate);

    if (date.toString() === 'Invalid Date') {
      throw new InvalidDateException();
    }

    const articles = await this.examService.getArticlesOfDate(date);
    await this.examService.removePreviousAssignment();

    const students = await this.examService.getStudents();
    const sortedStudentsWithScores =
      this.examService.calculateScoreOfStudentsAndSort(students, articles);

    const placedStudents = await this.examService.placeStudents(
      sortedStudentsWithScores,
    );

    const res = new DefaultResponseDto();
    res.affected = placedStudents.length;
    res.status = StatusCodesEnum.OK;
    return res;
  }
}
