import { Controller, Get, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { ExamService } from './exam.service';
import { StudentDocument } from '../students/schemas/student.schema';
import { InvalidDateException } from "./exceptions/invalidDate.exception";
import { StartExamDto } from "./dtos/startExam.dto";

@Controller('/')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  // YYYY-MM-DD
  @Get('startExam')
  @UsePipes(new ValidationPipe({ transform: true }))
  startExam(
    @Query() examDate: StartExamDto,
  ): Promise<StudentDocument[]> {
    const date = new Date(examDate.examDate);
    if (date.toString() === 'Invalid Date') {
      throw new InvalidDateException();
    }
    return this.examService.startExamAndPlaceStudents(date);
  }
}
