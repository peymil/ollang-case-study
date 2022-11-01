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

@ApiTags('Exam')
@Controller('/')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @ApiOperation({ description: 'Start exam at the specific date' })
  @Get('startExam')
  @ApiResponse({ status: 200, description: 'Exam finished successfully' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async startExam(@Query() examDate: StartExamDto) {
    const date = new Date(examDate.examDate);
    if (date.toString() === 'Invalid Date') {
      throw new InvalidDateException();
    }
    await this.examService.startExamAndPlaceStudents(date);
  }
}
