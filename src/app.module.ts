import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RandomUserModule } from './random-user/random-user.module';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitiesModule } from './universities/universities.module';
import { ExamModule } from './exam/exam.module';

@Module({
  imports: [
    RandomUserModule,
    MongooseModule.forRoot('mongodb://localhost'),
    UniversitiesModule,
    StudentsModule,
    ExamModule,
  ],
  providers: [AppService],
})
export class AppModule {}
