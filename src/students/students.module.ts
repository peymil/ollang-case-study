import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { RandomUserModule } from '../random-user/random-user.module';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schemas/student.schema';

@Module({
  imports: [
    RandomUserModule,
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  providers: [StudentsService],
  exports: [StudentsService],
  controllers: [StudentsController],
})
export class StudentsModule {}
