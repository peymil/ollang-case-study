import { Controller, Get, Query } from '@nestjs/common';
import { ExamService } from './exam.service';
import { StudentDocument } from '../students/schemas/student.schema';
import { InvalidDateException } from "./exceptions/invalidDate.exception";

@Controller('/')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  // YYYY-MM-DD
  @Get('startExam') startExam(
    @Query('examDate') examDate: string,
  ): Promise<StudentDocument[]> {
    const date = new Date(examDate);
    if (date.toString() === 'Invalid Date') {
      throw new InvalidDateException();
    }
    return this.examService.startExamAndPlaceStudents(date);
  }
}
