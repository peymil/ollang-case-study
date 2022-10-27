import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandomUserModule } from './random-user/random-user.module';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UniversitiesModule } from './universities/universities.module';

@Module({
  imports: [
    RandomUserModule,
    MongooseModule.forRoot('mongodb://localhost'),
    UniversitiesModule,
    StudentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
