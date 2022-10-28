import { Controller, Get } from '@nestjs/common';
import { ExamService } from './exam.service';
import { StudentDocument } from '../students/schemas/student.schema';

@Controller('/')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get('startExam') startExam(): Promise<StudentDocument[]> {
    return this.examService.startExamAndPlaceStudents();
  }
}
