import { Module } from '@nestjs/common';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { WikipediaModule } from '../wikipedia/wikipedia.module';
import { UniversitiesModule } from '../universities/universities.module';
import { StudentsModule } from '../students/students.module';

@Module({
  imports: [WikipediaModule, UniversitiesModule, StudentsModule],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
