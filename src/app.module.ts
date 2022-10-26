import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandomUserModule } from './random-user/random-user.module';
import { WikipediaModule } from './wikipedia/wikipedia.module';
import { HipolabsUniversitiesModule } from './hipoLabsUniversities/hipolabsUniversities.module';
import { StudentsModule } from './students/students.module';
import { MongooseModule } from "@nestjs/mongoose";
import { UniversitiesModule } from './universities/universities.module';

@Module({
  imports: [
    RandomUserModule,
    WikipediaModule,
    HipolabsUniversitiesModule,
    StudentsModule,
    MongooseModule.forRoot('mongodb://localhost'),
    UniversitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
